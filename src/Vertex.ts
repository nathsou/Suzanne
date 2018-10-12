import { Vec4 } from "./Utils/Vector/Vec4";
import { InterpolableType } from "./VaryingInterpolator/VaryingInterpolator";
import { Vec3 } from "./Utils/Vector/Vec3";
import { Vec2 } from "./Utils/Vector/Vec2";

export type AttributeType = InterpolableType;
export type UniformType = any;

export interface AttributeList {
    [key: string]: AttributeType,
    uv?: Vec2,
    normal?: Vec3
}

export interface VaryingList {
    [key: string]: InterpolableType
}

export interface UniformList {
    [key: string]: UniformType
}

export interface Vertex {
    readonly position: Vec3,
    readonly index: number,
    readonly attributes: Readonly<AttributeList>,
    readonly uniforms: Readonly<UniformList>,
    varyings: VaryingList
}

export interface FragmentVertex {
    // normalized device coordinates
    readonly ndc: Vec4,
    readonly varyings: Readonly<VaryingList>,
    readonly index: number
}