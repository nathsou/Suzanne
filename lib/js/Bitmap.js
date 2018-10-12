import { colors } from "./Utils/ColorUtils";
import { fillSequence } from "./Utils/MathUtils";
import { Vec4 } from "./Utils/Vector/Vec4";
export class Bitmap {
    constructor(width, height) {
        this._data = new Uint8ClampedArray(width * height * 4);
        this._width = width;
        this._height = height;
    }
    clear(color = colors.black) {
        fillSequence(this.data, [color.r * 255, color.g * 255, color.b * 255, color.a * 255]);
    }
    _set(x, y, color) {
        const idx = (x + y * this._width) * 4;
        this._data[idx] = color.r * 255;
        this._data[idx + 1] = color.g * 255;
        this._data[idx + 2] = color.b * 255;
        this._data[idx + 3] = color.a * 255;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get data() {
        return this._data;
    }
    at(x, y) {
        const idx = (x + y * this._width) * 4;
        return new Vec4(this._data[idx] / 255, this._data[idx + 1] / 255, this._data[idx + 2] / 255, this._data[idx + 3] / 255);
    }
    static fromImageData(img) {
        const bm = new Bitmap(img.width, img.height);
        bm._data.set(img.data);
        return bm;
    }
    static fromImage(img) {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return Bitmap.fromImageData(ctx.getImageData(0, 0, img.width, img.height));
    }
    static fromFile(source) {
        if (typeof window !== 'undefined') {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve(Bitmap.fromImage(img));
                };
                img.onerror = () => {
                    reject(source);
                };
                img.src = source;
            });
        }
        else {
            ///@ts-ignore
            console.log(__non_webpack_require__('fs'));
            throw new Error('Bitmap.fromFile() not implemented for node yet');
        }
    }
}
