import { Color } from "./Utils/ColorUtils";
import { Vec4 } from "./Utils/Vector/Vec4";
export declare class Bitmap {
    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;
    constructor(width: number, height: number);
    clear(color?: Vec4): void;
    protected _set(x: number, y: number, color: Color): void;
    readonly width: number;
    readonly height: number;
    resize(width: number, height: number): void;
    readonly data: Uint8ClampedArray;
    read(x: number, y: number): Color;
}
