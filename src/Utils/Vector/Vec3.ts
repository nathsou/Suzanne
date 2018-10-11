import { Vector, EPS } from "./Vector";
import { Vec2 } from "./Vec2";
import { Vec4 } from "./Vec4";
import { VecN } from "./VecN";

export function vec3(x: number, y: number, z: number): Vec3;
export function vec3(x: number, y: number): Vec3;
export function vec3(x: number): Vec3;
export function vec3(): Vec3;
export function vec3(v: Vec3 | Vec4 | VecN): Vec3;

export function vec3(...args: number[] | [Vec2 | Vec4 | VecN]): Vec3 {
    switch (args.length) {
        case 0:
            return new Vec3(0, 0, 0);

        case 1:
            if (typeof args[0] === 'number') {
                return new Vec3(args[0], args[0], args[0]);
            }

            if (args[0] instanceof Vec2) {
                return new Vec4(args[0].x, args[0].y, 0);
            }

            if (args[0] instanceof Vec4) {
                return new Vec3(args[0].x, args[0].y, args[0].z);
            }

            if (args[0] instanceof VecN) {
                const [x, y, z] = args[0].values;
                return new Vec3(x, y, z);
            }

            throw new Error(`Unexpected vec3 argument: ${args[0]}`);

        case 2:
            return new Vec3(args[0] as number, args[1] as number, 0);

        default:
            return new Vec3(args[0] as number, args[1] as number, args[2] as number);
    }
}

export class Vec3 implements Vector {

    public x: number;
    public y: number;
    public z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public add(v: Vec3): Vec3 {
        return new Vec3(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        );
    }

    public sub(v: Vec3): Vec3 {
        return new Vec3(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    }

    public mul(v: Vec3): Vec3 {
        return new Vec3(
            this.x * v.x,
            this.y * v.y,
            this.z * v.z
        );
    }

    public times(k: number): Vec3 {
        return new Vec3(
            this.x * k,
            this.y * k,
            this.z * k
        );
    }

    public div(v: Vec3): Vec3 {
        return new Vec3(
            this.x / v.x,
            this.y / v.y,
            this.z / v.z
        );
    }

    public dot(v: Vec3): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public mag(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    public normalize(): Vec3 {
        return this.times(1 / this.mag());
    }

    public reflect(N: Vec3): Vec3 {
        return N.times(2 * this.dot(N)).sub(this);
    }

    public addTimes(v: Vec3, k: number): Vector {
        return new Vec3(
            this.x + v.x * k,
            this.y + v.y * k,
            this.z + v.z * k
        );
    }

    public equals(v: Vec3, eps = EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps &&
            Math.abs(this.z - v.z) < eps;
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
}