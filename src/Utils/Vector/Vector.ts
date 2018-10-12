import { vec } from "./VecShorthands";

export const EPS = 10 ** - 6;

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

type Swizzled<T extends Vector> = {
    [K in keyof T | string]: K extends keyof T ? T[K] : number | Vector;
};

function swizzling_trap<T extends Vector>(v: T, prop: any): T {
    if (typeof prop !== 'string') return undefined;

    ///@ts-ignore
    const default_get = v[prop];

    if (default_get instanceof Function) {
        return default_get;
    }

    const chars = prop.split('');

    if (prop.length > 1 && prop.length < 5) { // && chars.every(char => 'xyzrgba'.includes(char))) { // && /[xyzwrgba]{1,4}/.test(prop)) {
        ///@ts-ignore
        const r = chars.map(char => v[char]);
        return r.length === 1 ? r[0] : vec(...r);
    }

    ///@ts-ignore
    return default_get;
};

export function swizzle<T extends Vector>(v: T, sizzling_str?: string): T {
    if (sizzling_str !== undefined) {
        return swizzling_trap(v, sizzling_str);
    }

    return new Proxy<T>(v, { get: swizzling_trap });
}