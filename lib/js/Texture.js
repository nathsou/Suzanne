"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bitmap_1 = require("./Bitmap");
class Texture extends Bitmap_1.Bitmap {
    constructor(width, height) {
        super(width, height);
    }
    at(uv) {
        return super.read(Math.floor(uv.x * this._width), Math.floor(uv.y * this._height));
    }
}
exports.Texture = Texture;
