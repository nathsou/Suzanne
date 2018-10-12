export declare const EPS: number;
export interface Vector {
    x: number;
    y: number;
    dims: number;
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
export declare function swizzle<T extends Vector>(v: T, sizzling_str?: string): T;
