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
    readonly data: Uint8ClampedArray;
    at(x: number, y: number): Color;
    static fromImageData(img: ImageData): Bitmap;
    static fromImage(img: HTMLImageElement): Bitmap;
    static fromFile(source: string): Promise<Bitmap>;
}
