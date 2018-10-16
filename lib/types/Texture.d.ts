import { Bitmap } from "./Bitmap";
import { Color } from "./Utils/ColorUtils";
import { Vec2 } from "./Utils/Vector/Vec2";
export declare class Texture extends Bitmap {
    constructor(width: number, height: number);
    at(uv: Vec2): Color;
}
