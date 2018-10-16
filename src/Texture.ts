import { Bitmap } from "./Bitmap";
import { Color } from "./Utils/ColorUtils";
import { Vec2 } from "./Utils/Vector/Vec2";

export class Texture extends Bitmap {

    constructor(width: number, height: number) {
        super(width, height);
    }

    public at(uv: Vec2): Color {
        return super.read(Math.floor(uv.x * this._width), Math.floor(uv.y * this._height));
    }

}