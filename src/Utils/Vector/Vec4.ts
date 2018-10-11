import { Vector, EPS } from "./Vector";
import { Vec3 } from "./Vec3";
import { Vec2 } from "./Vec2";
import { VecN } from "./VecN";

export function vec4(x: number, y: number, z: number, w: number): Vec4;
export function vec4(x: number, y: number, z: number): Vec4;
export function vec4(x: number, y: number): Vec4;
export function vec4(x: number): Vec4;
export function vec4(v: Vec2 | Vec3 | VecN): Vec4;
export function vec4(v: Vec3, w: number): Vec4;

export function vec4(...args: number[] | [Vec2 | Vec3 | VecN] | [Vec3, number]): Vec4 {

    switch (args.length) {
        case 0:
            return new Vec4(0, 0, 0, 0);

        case 1:
            if (typeof args[0] === 'number') {
                return new Vec4(args[0], args[0], args[0], args[0]);
            }

            if (args[0] instanceof Vec3) {
                return new Vec4(args[0].x, args[0].y, args[0].z, 1);
            }

            if (args[0] instanceof Vec2) {
                return new Vec4(args[0].x, args[0].y, args[0].x, args[0].y);
            }

            if (args[0] instanceof Vec4) {
                return new Vec4(args[0].x, args[0].y, args[0].z, args[0].w);
            }

            if (args[0] instanceof VecN) {
                const [x, y, z, w] = args[0].values;
                return new Vec4(x, y, z, w);
            }

            throw new Error(`Unexpected vec4 argument: ${args[0]}`);

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


export class Vec4 implements Vector {

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public add(v: Vec4): Vec4 {
        return new Vec4(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z,
            this.w + v.w
        );
    }

    public sub(v: Vec4): Vec4 {
        return new Vec4(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z,
            this.w - v.w
        );
    }

    public mul(v: Vec4): Vec4 {
        return new Vec4(
            this.x * v.x,
            this.y * v.y,
            this.z * v.z,
            this.w * v.w
        );
    }

    public times(k: number): Vec4 {
        return new Vec4(
            this.x * k,
            this.y * k,
            this.z * k,
            this.w * k
        );
    }

    public div(v: Vec4): Vec4 {
        return new Vec4(
            this.x / v.x,
            this.y / v.y,
            this.z / v.z,
            this.w / v.w
        );
    }

    public dot(v: Vec4): number {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    public mag(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
    }

    public normalize(): Vec4 {
        return this.times(1 / this.mag());
    }

    public reflect(N: Vec4): Vec4 {
        return N.times(2 * this.dot(N)).sub(this);
    }

    public addTimes(v: Vec4, k: number): Vector {
        return new Vec4(
            this.x + v.x * k,
            this.y + v.y * k,
            this.z + v.z * k,
            this.w + v.w * k
        );
    }

    public equals(v: Vec4, eps = EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps &&
            Math.abs(this.z - v.z) < eps &&
            Math.abs(this.w - v.w) < eps;
    }

    public get r(): number {
        return this.x;
    }

    public set r(r: number) {
        this.x = r;
    }

    public get g(): number {
        return this.y;
    }

    public set g(g: number) {
        this.y = g;
    }

    public get b(): number {
        return this.z;
    }

    public set b(b: number) {
        this.z = b;
    }

    public get a(): number {
        return this.w;
    }

    public set a(a: number) {
        this.w = a;
    }
}