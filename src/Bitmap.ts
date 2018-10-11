import { Color, colors } from "./Utils/ColorUtils";
import { fillSequence } from "./Utils/MathUtils";
import { Vec4 } from "./Utils/Vector/Vec4";

export class Bitmap {

    protected _data: Uint8ClampedArray;
    protected _width: number;
    protected _height: number;

    constructor(width: number, height: number) {
        this._data = new Uint8ClampedArray(width * height * 4);
        this._width = width;
        this._height = height;
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

    public get data(): Uint8ClampedArray {
        return this._data;
    }

    public at(x: number, y: number): Color {
        const idx = (x + y * this._width) * 4;
        return new Vec4(
            this._data[idx] / 255,
            this._data[idx + 1] / 255,
            this._data[idx + 2] / 255,
            this._data[idx + 3] / 255
        );
    }

    public static fromImageData(img: ImageData): Bitmap {
        const bm = new Bitmap(img.width, img.height);
        bm._data.set(img.data);

        return bm;
    }

    public static fromImage(img: HTMLImageElement): Bitmap {
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return Bitmap.fromImageData(ctx.getImageData(0, 0, img.width, img.height));
    }

    public static fromFile(source: string): Promise<Bitmap> {
        if (typeof window !== 'undefined') {
            return new Promise<Bitmap>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve(Bitmap.fromImage(img));
                };

                img.onerror = () => {
                    reject(source);
                }

                img.src = source;
            });
        } else {
            ///@ts-ignore
            console.log(__non_webpack_require__('fs'));
            throw new Error('Bitmap.fromFile() not implemented for node yet');
        }
    }

}