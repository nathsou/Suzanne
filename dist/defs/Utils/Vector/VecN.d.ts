import { Vector } from "./Vector";
export declare const vecn: (...values: number[]) => VecN;
export declare class VecN implements Vector {
    private _values;
    private _dims;
    constructor(values: (number[] | Float32Array));
    add(v: VecN): VecN;
    sub(v: VecN): VecN;
    mul(v: VecN): VecN;
    times(k: number): VecN;
    div(v: VecN): VecN;
    dot(v: VecN): number;
    mag(): number;
    normalize(): VecN;
    reflect(N: VecN): VecN;
    addTimes(v: VecN, k: number): Vector;
    equals(v: VecN, eps?: number): boolean;
    readonly dims: number;
    values: Float32Array;
}
