"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColorUtils_1 = require("./Utils/ColorUtils");
const MathUtils_1 = require("./Utils/MathUtils");
const Vec4_1 = require("./Utils/Vector/Vec4");
class Bitmap {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(this._width * this._height * 4);
    }
    clear(color = ColorUtils_1.colors.black) {
        MathUtils_1.fillSequence(this.data, [color.r * 255, color.g * 255, color.b * 255, color.a * 255]);
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
    resize(width, height) {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(this._width * this._height * 4);
    }
    get data() {
        return this._data;
    }
    read(x, y) {
        const idx = (x + y * this._width) * 4;
        return new Vec4_1.Vec4(this._data[idx] / 255, this._data[idx + 1] / 255, this._data[idx + 2] / 255, this._data[idx + 3] / 255);
    }
}
exports.Bitmap = Bitmap;
