import { Color, colors } from "./Utils/ColorUtils";
import { fillSequence } from "./Utils/MathUtils";
import { Vec4 } from "./Utils/Vector/Vec4";

export class Bitmap {

    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(this._width * this._height * 4);
    }

    public clear(color = colors.black): void {
        fillSequence(
            this.data,
            [color.r * 255, color.g * 255, color.b * 255, color.a * 255]
        );
    }

    protected _set(x: number, y: number, color: Color): void {
        const idx = (x + y * this._width) * 4;

        this._data[idx] = color.r * 255;
        this._data[idx + 1] = color.g * 255;
        this._data[idx + 2] = color.b * 255;
        this._data[idx + 3] = color.a * 255;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public resize(width: number, height: number): void {
        this._width = width;
        this._height = height;
        this._data = new Uint8ClampedArray(this._width * this._height * 4);
    }

    public get data(): Uint8ClampedArray {
        return this._data;
    }

    public read(x: number, y: number): Color {
        const idx = (x + y * this._width) * 4;
        return new Vec4(
            this._data[idx] / 255,
            this._data[idx + 1] / 255,
            this._data[idx + 2] / 255,
            this._data[idx + 3] / 255
        );
    }

}