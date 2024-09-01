from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import zlib
from mandelbrot import Mandelbrot
from julia import Julia

app = Flask(__name__)
CORS(app)

julia_instance = Julia()

@app.route('/mandelbrot', methods=['POST'])
def mandelbrot_endpoint():
    data = request.json

    width, height, exponent, colorScheme, iterations = data['width'], data['height'], data['exponent'], data['colorScheme'], data['iterations']
    xMin, xMax, yMin, yMax = data['xMin'], data['xMax'], data['yMin'], data['yMax']

    mandelbrot_instance = Mandelbrot(width, height, exponent, colorScheme, iterations, xMin, xMax, yMin, yMax)

    start_time = time.time()

    colored_mandelbrot = mandelbrot_instance.render()
    compressed_data = zlib.compress(bytearray(colored_mandelbrot))

    print(time.time() - start_time)

    return jsonify({
        'width': mandelbrot_instance.width,
        'height': mandelbrot_instance.height,
        'pixels': compressed_data.hex()
    })

@app.route('/julia', methods=['POST'])
def julia_endpoint():
    data = request.json

    width, height, exponent, colorScheme, iterations = data['width'], data['height'], data['exponent'], data['colorScheme'], data['iterations']
    xMin, xMax, yMin, yMax = data['xMin'], data['xMax'], data['yMin'], data['yMax']

    c_real, c_imag = data['c']
    c = complex(c_real, c_imag)

    julia_instance = Julia(width, height, exponent, colorScheme, c, iterations, xMin, xMax, yMin, yMax)

    start_time = time.time()
    colored_julia = julia_instance.render()
    compressed_data = zlib.compress(bytearray(colored_julia))

    print(time.time() - start_time)
    
    return jsonify({
        'width': julia_instance.width,
        'height': julia_instance.height,
        'pixels': compressed_data.hex()
    })

if __name__ == '__main__':
    app.run(debug=True)
