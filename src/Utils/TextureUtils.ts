import { Bitmap } from "../Bitmap";
import { Color } from "./ColorUtils";
import { Vec2 } from "./Vector/Vec2";

export const texture = (tex: Bitmap, uv: Vec2): Color =>
    tex.at(
        Math.floor(uv.x * tex.width),
        Math.floor(uv.y * tex.height)
    );