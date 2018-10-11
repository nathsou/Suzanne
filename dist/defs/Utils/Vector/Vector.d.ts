import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";
import { Vec4 } from "./Vec4";
import { VecN } from "./VecN";
export declare const EPS: number;
export interface Vector {
    add(v: Vector): Vector;
    sub(v: Vector): Vector;
    mul(v: Vector): Vector;
    times(k: number): Vector;
    div(v: Vector): Vector;
    dot(v: Vector): number;
    mag(): number;
    normalize(): Vector;
    reflect(N: Vector): Vector;
    addTimes(v: Vector, k: number): Vector;
    equals(v: Vector, eps: number): boolean;
}
export declare function vec(x: number): VecN;
export declare function vec(x: number, y: number): Vec2;
export declare function vec(x: number, y: number, z: number): Vec3;
export declare function vec(x: number, y: number, z: number, w: number): Vec4;
export declare function vec(...values: number[]): VecN;
export declare function swizzle<T extends Vector>(v: T, sizzling_str?: string): T;
