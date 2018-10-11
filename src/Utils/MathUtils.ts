import { Vec2 } from "./Vector/Vec2";
import { Vector } from "./Vector/Vector";
import { InterpolableType } from "../VaryingInterpolator/VaryingInterpolator";

export const degrees = (angle_radians: number): number => {
    return (angle_radians * 57.29577951308232) % 360;
}

export const radians = (angle_degrees: number): number => {
    return (angle_degrees * 0.017453292519943295) % 6.283185307179586;
}

export const clamp = (x: number, min: number, max: number): number => {
    return Math.max(Math.min(x, max), min);
}

export function parallelogramArea(
    a: Vec2,
    b: Vec2,
    c: Vec2
): number {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}

export function interpolableAdd<T extends InterpolableType>(a: T, b: T): T {
    if (typeof a === 'number') {
        return (a + (b as number)) as T;
    } else {
        return (a as Vector).add(b as Vector) as T;
    }
}

export function interpolableTimes<T extends InterpolableType>(a: T, k: number): T {
    if (typeof a === 'number') {
        return (a * k) as T;
    } else {
        return (a as Vector).times(k) as T;
    }
}

export function interpolableMul<T extends InterpolableType>(a: T, b: T): T {
    if (typeof a === 'number') {
        return (a * (b as number)) as T;
    } else {
        return (a as Vector).mul(b as Vector) as T;
    }
}

export function interpolableAddTimes<T extends InterpolableType>(a: T, b: T, k: number): T {
    if (typeof a === 'number') {
        return ((a + (b as number) * k)) as T;
    } else {
        return (a as Vector).addTimes(b as Vector, k) as T;
    }
}

export type UintArray = Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray;

export type TypedArray = UintArray | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;


/**
 * Fill a TypedArray with a sequence of elements in O(log(dest.length)) time
 *
 * @export
 * @template T
 * @param {T} dest the destination TypedArray
 * @param {ArrayLike<number>} seq the sequence to repeat
 * @returns {T} the mutated dest TypedArray
 */
export function fillSequence<T extends TypedArray>(dest: T, seq: ArrayLike<number>): T {
    dest.set(seq);

    const dest_len = dest.length;
    let offset = seq.length;

    while (offset < dest_len) {
        dest.copyWithin(offset, 0, offset);
        offset <<= 1;
    }

    return dest;
}