import { Vec2 } from "./Vector/Vec2";
import { InterpolableType } from "../VaryingInterpolator/VaryingInterpolator";
export declare const degrees: (angle_radians: number) => number;
export declare const radians: (angle_degrees: number) => number;
export declare const clamp: (x: number, min: number, max: number) => number;
export declare function parallelogramArea(a: Vec2, b: Vec2, c: Vec2): number;
export declare function interpolableAdd<T extends InterpolableType>(a: T, b: T): T;
export declare function interpolableTimes<T extends InterpolableType>(a: T, k: number): T;
export declare function interpolableMul<T extends InterpolableType>(a: T, b: T): T;
export declare function interpolableAddTimes<T extends InterpolableType>(a: T, b: T, k: number): T;
export declare type UintArray = Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray;
export declare type TypedArray = UintArray | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
/**
 * Fill a TypedArray with a sequence of elements in O(log(dest.length)) time
 *
 * @export
 * @template T
 * @param {T} dest the destination TypedArray
 * @param {ArrayLike<number>} seq the sequence to repeat
 * @returns {T} the mutated dest TypedArray
 */
export declare function fillSequence<T extends TypedArray>(dest: T, seq: ArrayLike<number>): T;
