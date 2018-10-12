import { Vector, EPS } from "./Vector";

export class Vec4 implements Vector {

    public x: number;
    public y: number;
    public z: number;
    public w: number;
    public readonly dims: number;

    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.dims = 4;
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