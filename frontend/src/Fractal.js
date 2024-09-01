import React, { useState } from 'react';
import Mandelbrot from './Mandelbrot';
import Julia from './Julia';
import "./App.css";

const Fraktal = () => {

    const BACKEND_URL = 'http://127.0.0.1:5000' //'https://backend-fraktal.onrender.com'

    const defaultZoomState = {
        xMin: -2.0,
        xMax: 1.0,
        yMin: -1.5,
        yMax: 1.5,
        width: window.innerWidth,
        height: window.innerHeight,
        exponent: 2,
        colorScheme: 'inferno',
        iterations: 50
    };
    const [juliaConstant, setJuliaConstant] = useState(null);

    const [isMandelbrot, setIsMandelbrot] = useState(true);
    const [isGetJuliaFromPointSelected, setIsGetJuliaFromPointSelected] = useState(false);
    const [zoomState, setZoomState] = useState(defaultZoomState);
    const [renderTime, setRenderTime] = useState(0);

    const handleGetJuliaSet = () => {
        setIsGetJuliaFromPointSelected(true);
    };

    const handleBackToMandelbrot = () => {
        setIsMandelbrot(true);
        setIsGetJuliaFromPointSelected(false);
        setZoomState(defaultZoomState);
    };

    const handleZoomStateChange = (newZoomState) => {
        setZoomState(newZoomState);
    };

    const handleJuliaConstantSelection = async (constant) => {
        setJuliaConstant(constant);
        setIsMandelbrot(false);
        setZoomState(defaultZoomState)
    };

    const handleResetZoom = () => {
        setZoomState(defaultZoomState);
    };

    return (
        <div>
            <div className='menu'>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px' }}>Exponent:</label>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        value={zoomState.exponent}
                        onChange={(e) => setZoomState({ ...zoomState, exponent: parseInt(e.target.value, 10) })}
                        style={{ width: '150px' }}
                    />
                    <span style={{ marginLeft: '10px' }}>{zoomState.exponent}</span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px' }}>Barevné schéma:</label>
                    <select
                        value={zoomState.colorScheme}
                        onChange={(e) => setZoomState({ ...zoomState, colorScheme: e.target.value })}
                        style={{ width: '150px' }}
                    >
                        {['viridis', 'plasma', 'inferno', 'magma', 'cividis'].map(scheme => (
                            <option key={scheme} value={scheme}>
                                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px' }}>Iterace</label>
                    <input
                        type='range'
                        min='50'
                        max='150'
                        value={zoomState.iterations}
                        onChange={(e) => setZoomState({ ...zoomState, iterations: parseInt(e.target.value, 10) })}
                        style={{ width: '150px' }}
                    />
                    <span style={{ marginLeft: '10px' }}>{zoomState.iterations}</span>
                </div>
                {isMandelbrot ? (
                    <>
                        <button style={{ marginBottom: '15px' }} onClick={handleGetJuliaSet}>Vybrat konstantu pro Juliovu množinu</button>
                    </>
                ) : (
                    <button style={{ marginBottom: '15px' }} onClick={handleBackToMandelbrot}>Vrátit se zpět k Mandelbrotově množině</button>
                )}
                <button style={{ marginBottom: '15px' }} onClick={handleResetZoom}>Odzoomovat</button>
                <div>
                    <label>{'Čas renderování: ' + renderTime + ' ms'} </label>
                </div>
            </div>
            <div className='fraktalHolder'>
                {isMandelbrot ? (
                    <Mandelbrot 
                        zoomState={zoomState} 
                        onZoomStateChange={handleZoomStateChange} 
                        onSelectJuliaConstant={handleJuliaConstantSelection} 
                        isGetJuliaFromPointSelected={isGetJuliaFromPointSelected} 
                        setRenderTime={setRenderTime}
                        BACKEND_URL = {BACKEND_URL}
                    />
                ) : (
                    <Julia 
                        zoomState={zoomState} 
                        juliaConstant={juliaConstant} 
                        onZoomStateChange={handleZoomStateChange} 
                        setRenderTime={setRenderTime}
                        BACKEND_URL = {BACKEND_URL}
                    />
                )}
            </div>
        </div>
    );
};

export default Fraktal;
