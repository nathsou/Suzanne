import { Vector } from "./Vector";
export declare class Vec3 implements Vector {
    x: number;
    y: number;
    z: number;
    readonly dims: number;
    constructor(x?: number, y?: number, z?: number);
    add(v: Vec3): Vec3;
    sub(v: Vec3): Vec3;
    mul(v: Vec3): Vec3;
    times(k: number): Vec3;
    div(v: Vec3): Vec3;
    dot(v: Vec3): number;
    mag(): number;
    normalize(): Vec3;
    reflect(N: Vec3): Vec3;
    addTimes(v: Vec3, k: number): Vector;
    equals(v: Vec3, eps?: number): boolean;
    r: number;
    g: number;
    b: number;
}
