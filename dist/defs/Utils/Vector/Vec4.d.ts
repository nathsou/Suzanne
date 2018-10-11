import { Vector } from "./Vector";
import { Vec3 } from "./Vec3";
import { Vec2 } from "./Vec2";
import { VecN } from "./VecN";
export declare function vec4(x: number, y: number, z: number, w: number): Vec4;
export declare function vec4(x: number, y: number, z: number): Vec4;
export declare function vec4(x: number, y: number): Vec4;
export declare function vec4(x: number): Vec4;
export declare function vec4(v: Vec2 | Vec3 | VecN): Vec4;
export declare function vec4(v: Vec3, w: number): Vec4;
export declare class Vec4 implements Vector {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    add(v: Vec4): Vec4;
    sub(v: Vec4): Vec4;
    mul(v: Vec4): Vec4;
    times(k: number): Vec4;
    div(v: Vec4): Vec4;
    dot(v: Vec4): number;
    mag(): number;
    normalize(): Vec4;
    reflect(N: Vec4): Vec4;
    addTimes(v: Vec4, k: number): Vector;
    equals(v: Vec4, eps?: number): boolean;
    r: number;
    g: number;
    b: number;
    a: number;
}