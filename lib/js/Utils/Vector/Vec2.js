import { EPS } from "./Vector";
export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.dims = 2;
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
    mul(v) {
        return new Vec2(this.x * v.x, this.y * v.y);
    }
    times(k) {
        return new Vec2(this.x * k, this.y * k);
    }
    div(v) {
        return new Vec2(this.x / v.x, this.y / v.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    normalize() {
        return this.times(1 / this.mag());
    }
    reflect(N) {
        return N.times(2 * this.dot(N)).sub(this);
    }
    addTimes(v, k) {
        return new Vec2(this.x + v.x * k, this.y + v.y * k);
    }
    equals(v, eps = EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps;
    }
}
