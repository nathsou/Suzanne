import { Vector, EPS } from "./Vector";

export class Vec3 implements Vector {

    public x: number;
    public y: number;
    public z: number;
    public readonly dims: number;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dims = 3;
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