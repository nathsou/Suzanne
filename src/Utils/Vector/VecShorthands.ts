import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";
import { Vec4 } from "./Vec4";
import { VecN } from "./VecN";
import { Vector } from "./Vector";
import { Matrix4 } from "../Matrix4";

export function vec2(x: number, y: number): Vec2;
export function vec2(x: number): Vec2;
export function vec2(v: Vec2 | Vec3 | Vec4 | VecN): Vec2;
export function vec2(): Vec2;

export function vec2(...args: number[] | [Vec2 | Vec3 | Vec4 | VecN]): Vec2 {
    switch (args.length) {
        case 0:
            return new Vec2(0, 0);

        case 1:
            if (typeof args[0] === 'number') {
                return new Vec2(args[0], args[0]);
            }

            return new Vec2(args[0].x, args[0].y);

        case 2:
        default:
            return new Vec2(args[0] as number, args[1] as number);
    }
}

export function vec3(x: number, y: number, z: number): Vec3;
export function vec3(x: number, y: number): Vec3;
export function vec3(x: number): Vec3;
export function vec3(v: Vec3 | Vec4 | VecN): Vec3;
export function vec3(): Vec3;

export function vec3(...args: (number[] | [Vec2 | Vec3 | Vec4 | VecN])): Vec3 {
    switch (args.length) {
        case 0:
            return new Vec3(0, 0, 0);

        case 1:
            if (typeof args[0] === 'number') {
                return new Vec3(args[0], args[0], args[0]);
            }

            switch (args[0].dims) {
                case 2:
                    return new Vec4(args[0].x, args[0].y, 0);

                case 3:
                case 4:
                default:
                    return new Vec3(args[0].x, args[0].y, (args[0] as Vec3).z);
            }

        case 2:
            return new Vec3(args[0] as number, args[1] as number, 0);

        default:
            return new Vec3(args[0] as number, args[1] as number, args[2] as number);
    }
}


export function vec4(x: number, y: number, z: number, w: number): Vec4;
export function vec4(x: number, y: number, z: number): Vec4;
export function vec4(x: number, y: number): Vec4;
export function vec4(v: Vec3, w: number): Vec4;
export function vec4(x: number): Vec4;
export function vec4(v: Vec2 | Vec3 | VecN): Vec4;
export function vec4(): Vec4;

export function vec4(...args: (number[] | [Vec2 | Vec3 | VecN] | [Vec3, number])): Vec4 {
    switch (args.length) {
        case 0:
            return new Vec4(0, 0, 0, 0);

        case 1:
            if (typeof args[0] === 'number') {
                return new Vec4(args[0], args[0], args[0], args[0]);
            }

            switch (args[0].dims) {

                case 2:
                    return new Vec4(
                        (args[0] as Vec2).x,
                        (args[0] as Vec2).y,
                        (args[0] as Vec2).x,
                        (args[0] as Vec2).y
                    );

                case 3:
                    return new Vec4((args[0] as Vec3).x, (args[0] as Vec3).y, (args[0] as Vec3).z, 1);

                case 4:
                    return new Vec4(
                        (args[0] as Vec4).x,
                        (args[0] as Vec4).y,
                        (args[0] as Vec4).x,
                        (args[0] as Vec4).y
                    );


                default:
                    if (args[0] instanceof VecN) {
                        const [x, y, z, w] = args[0].values;
                        return new Vec4(x, y, z, w);
                    }

                    throw new Error(`Unexpected vec4 argument: ${args[0]}`);
            }

        case 2:
            if (args[0] instanceof Vec3) {
                const v = args[0];
                return new Vec4(v.x, v.y, v.z, args[1] as number);
            } else {
                const [x, y] = args as number[];
                return new Vec4(x, y, x, y);
            }

        case 3:
            return new Vec4(args[0] as number, args[1] as number, args[2] as number, 1);

        default:
            return new Vec4(args[0] as number, args[1] as number, args[2] as number, args[3] as number);
    }
}

export const vecn = (...values: number[]) => new VecN(values);

export function vec(x: number): VecN;
export function vec(x: number, y: number): Vec2;
export function vec(x: number, y: number, z: number): Vec3;
export function vec(x: number, y: number, z: number, w: number): Vec4;
export function vec(...values: number[]): VecN;

export function vec(...values: number[]): Vector {
    switch (values.length) {
        case 2:
            return new Vec2(values[0], values[1]);

        case 3:
            return new Vec3(values[0], values[1], values[2]);

        case 4:
            return new Vec4(values[0], values[1], values[2], values[3]);

        default:
            return new VecN(values);
    }
}

export function mat4(s: number): Matrix4;
export function mat4(coeffs: Float32Array): Matrix4;
export function mat4(...coeffs: number[]): Matrix4;
export function mat4(row_1: Vec4, row_2: Vec4, row_3: Vec4, row_4: Vec4): Matrix4;

export function mat4(...args: (Vec4[] | number[] | [Float32Array])): Matrix4 {

    if (args.length === 0) {
        return new Matrix4();
    }

    if (typeof args[0] === 'number') {
        if (args.length === 1) {
            return Matrix4.scale(args[0]);
        }

        if (args.length === 16) {
            return new Matrix4(new Float32Array(args as number[]));
        }
    }

    if (args[0] instanceof Float32Array) {
        return new Matrix4(args[0]);
    }

    if (args[0] instanceof Vec4 && args.length === 4) {
        const [a, b, c, d] = args as Vec4[];
        return new Matrix4(new Float32Array([
            a.x, a.y, a.z, a.w,
            b.x, b.y, b.z, b.w,
            c.x, c.y, c.z, c.w,
            d.x, d.y, d.z, d.w
        ]));
    }

    throw new Error(`Unexpected arguments for mat4: ${args}`);
}