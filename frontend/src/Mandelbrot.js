import React, { useRef, useEffect } from 'react';
import pako from 'pako';

const Mandelbrot = ({ zoomState, onZoomStateChange, onSelectJuliaConstant, isGetJuliaFromPointSelected, setRenderTime, BACKEND_URL }) => {

    const canvasRef = useRef();

    const refresh = async () => {
        const start = Date.now();
        try {
            const response = await fetch(BACKEND_URL + '/mandelbrot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zoomState),
            });
            const data = await response.json();
            drawFractal(data);
        } catch (error) {
            console.error('Error fetching the fractal data:', error);
        }
        const end = Date.now();
        setRenderTime(end - start)
    };

    useEffect(() => {
        refresh();
    }, [zoomState]);

    const drawFractal = (data) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height, pixels } = data;

        if (!pixels) {
            console.error('Pixels data is undefined or null:', data);
            return;
        }

        const compressedPixels = new Uint8Array(pixels.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const decompressedPixels = pako.inflate(compressedPixels);

        const imageData = ctx.createImageData(width, height);
        const dataArray = new Uint8ClampedArray(decompressedPixels);

        if (dataArray.length === imageData.data.length) {
            imageData.data.set(dataArray);
            ctx.putImageData(imageData, 0, 0);
        } else {
            console.error('Data array length does not match imageData length.');
        }
    };

    const handleCanvasClick = async (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const { xMin, xMax, yMin, yMax, width, height } = zoomState;

        const x_center = xMin + (x / width) * (xMax - xMin);
        const y_center = yMin + (y / height) * (yMax - yMin);

        if (isGetJuliaFromPointSelected) {
            await onSelectJuliaConstant([x_center, y_center]);
        } else {
            const scale = 0.5;
            const x_range = (xMax - xMin) * scale;
            const y_range = (yMax - yMin) * scale;

            const newZoomState = {
                ...zoomState,
                xMin: x_center - x_range / 2,
                xMax: x_center + x_range / 2,
                yMin: y_center - y_range / 2,
                yMax: y_center + y_range / 2
            };

            onZoomStateChange(newZoomState);
        }
    };

    return (
        <canvas className="fraktalCanvas" ref={canvasRef} width={zoomState.width} height={zoomState.height} onClick={handleCanvasClick}></canvas>
    );
};

export default Mandelbrot;
