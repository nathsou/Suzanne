import { AttributeType } from "../Vertex";
import { Color } from "./ColorUtils";
import { UintArray, TypedArray } from "./MathUtils";
import { Vec2 } from "./Vector/Vec2";
import { Vec3 } from "./Vector/Vec3";
interface AttributeArray {
    [key: string]: AttributeType[];
    uv?: Vec2[];
    normal?: Vec3[];
    color?: Color[];
}
export interface VertexData {
    vertices: Vec3[];
    indices?: UintArray;
    attributes?: AttributeArray;
    bounding_box?: BoundingBox;
}
export interface FlatAttributeArrayInfo<T extends TypedArray> {
    stride: number;
    array: T;
}
export interface FlatVec3ArrayInfo extends FlatAttributeArrayInfo<Float32Array> {
    stride: 3;
    array: Float32Array;
}
interface FlatAttributeArray {
    [key: string]: FlatAttributeArrayInfo<TypedArray>;
    uv?: FlatVec3ArrayInfo;
    normal?: FlatVec3ArrayInfo;
    color?: FlatVec3ArrayInfo;
}
export interface FlatVertexData {
    vertices: FlatVec3ArrayInfo;
    indices: UintArray;
    attributes?: FlatAttributeArray;
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
