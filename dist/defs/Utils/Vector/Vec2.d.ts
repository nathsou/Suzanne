import { Vector } from "./Vector";
export declare const vec2: (x?: number, y?: number) => Vec2;
export declare class Vec2 implements Vector {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(v: Vec2): Vec2;
    sub(v: Vec2): Vec2;
    mul(v: Vec2): Vec2;
    times(k: number): Vec2;
    div(v: Vec2): Vec2;
    dot(v: Vec2): number;
    mag(): number;
    normalize(): Vec2;
    reflect(N: Vec2): Vec2;
    addTimes(v: Vec2, k: number): Vector;
    equals(v: Vec2, eps?: number): boolean;
}
