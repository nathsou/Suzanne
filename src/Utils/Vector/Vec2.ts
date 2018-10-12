import { Vector, EPS } from "./Vector";

export class Vec2 implements Vector {

    public x: number;
    public y: number;
    public readonly dims: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.dims = 2;
    }

    public add(v: Vec2): Vec2 {
        return new Vec2(
            this.x + v.x,
            this.y + v.y
        );
    }

    public sub(v: Vec2): Vec2 {
        return new Vec2(
            this.x - v.x,
            this.y - v.y
        );
    }

    public mul(v: Vec2): Vec2 {
        return new Vec2(
            this.x * v.x,
            this.y * v.y
        );
    }

    public times(k: number): Vec2 {
        return new Vec2(
            this.x * k,
            this.y * k
        );
    }

    public div(v: Vec2): Vec2 {
        return new Vec2(
            this.x / v.x,
            this.y / v.y
        );
    }

    public dot(v: Vec2): number {
        return this.x * v.x + this.y * v.y;
    }

    public mag(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    public normalize(): Vec2 {
        return this.times(1 / this.mag());
    }

    public reflect(N: Vec2): Vec2 {
        return N.times(2 * this.dot(N)).sub(this);
    }

    public addTimes(v: Vec2, k: number): Vector {
        return new Vec2(
            this.x + v.x * k,
            this.y + v.y * k
        );
    }

    public equals(v: Vec2, eps = EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps;
    }

}