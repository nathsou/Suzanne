import { AttributeType } from "../Vertex";
import { UintArray } from "./MathUtils";
import { Vec2 } from "./Vector/Vec2";
import { Vec3 } from "./Vector/Vec3";
import { Color } from "./ColorUtils";
interface AttributeListArray {
    [key: string]: AttributeType[];
    uv?: Vec2[];
    normal?: Vec3[];
    color?: Color[];
}
export interface VertexData {
    vertices: Vec3[];
    indices: UintArray;
    attributes?: AttributeListArray;
    bounding_box?: BoundingBox;
}
export interface BoundingBox {
    min: Vec3;
    max: Vec3;
}
export declare namespace ModelLoader {
    const parseOBJ: (obj_str: string) => VertexData;
}
export {};
