import numpy as np
import numba
from numba import njit
import matplotlib.cm as cm
import matplotlib.colors as colors

class Mandelbrot:
    def __init__(self, width=800, height=600, exponent=2, colorScheme="inferno", maxIter=50, xMin=-2.0, xMax=1.0, yMin=-1.5, yMax=1.5):
        self.width, self.height = width, height
        self.maxIter = maxIter
        self.exponent = exponent
        self.colorScheme = colorScheme

        self.xMin, self.xMax, self.yMin, self.yMax = xMin, xMax, yMin, yMax

        aspectRatio = self.width / self.height
        desiredAspectRatio = (self.xMax - self.xMin) / (self.yMax - self.yMin)

        if aspectRatio > desiredAspectRatio:
            new_width = (self.yMax - self.yMin) * aspectRatio
            x_center = (self.xMin + self.xMax) / 2
            self.xMin = x_center - new_width / 2
            self.xMax = x_center + new_width / 2
        else:
            new_height = (self.xMax - self.xMin) / aspectRatio
            y_center = (self.yMin + self.yMax) / 2
            self.yMin = y_center - new_height / 2
            self.yMax = y_center + new_height / 2

        self.x, self.y = np.linspace(self.xMin, self.xMax, self.width), np.linspace(self.yMin, self.yMax, self.height)


    @staticmethod
    @njit(fastmath=True, parallel=True)
    def _render(x, y, maxIter, exponent):
        height = y.size
        width = x.size

        mandelbrotField = np.zeros((height, width), dtype=np.uint8)
        for j in numba.prange(height):
            for i in numba.prange(width):
                c = x[i] + 1j * y[j]
                z = 0.0j
                numIter = maxIter
                for k in range(maxIter):
                    if (z.real * z.real + z.imag * z.imag) >= 4.0:
                        numIter = k
                        break
                    z = z ** exponent + c
                mandelbrotField[j, i] = numIter
        return mandelbrotField

    def _apply_colormap(self, mandelbrotField):
        norm = colors.Normalize(vmin=0, vmax=mandelbrotField.max())
        cmap = cm.get_cmap(self.colorScheme)
        colored_set = cmap(norm(mandelbrotField))
        return (colored_set[:, :, :4] * 255).astype(np.uint8).flatten().tolist()
    
    def render(self):
        self.mandelbrotField = self._render(self.x, self.y, self.maxIter, self.exponent)
        return self._apply_colormap(self.mandelbrotField)
