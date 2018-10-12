import { EPS } from "./Vector";
export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dims = 3;
    }
    add(v) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(v) {
        return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    times(k) {
        return new Vec3(this.x * k, this.y * k, this.z * k);
    }
    div(v) {
        return new Vec3(this.x / v.x, this.y / v.y, this.z / v.z);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    normalize() {
        return this.times(1 / this.mag());
    }
    reflect(N) {
        return N.times(2 * this.dot(N)).sub(this);
    }
    addTimes(v, k) {
        return new Vec3(this.x + v.x * k, this.y + v.y * k, this.z + v.z * k);
    }
    equals(v, eps = EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps &&
            Math.abs(this.z - v.z) < eps;
    }
    get r() {
        return this.x;
    }
    set r(r) {
        this.x = r;
    }
    get g() {
        return this.y;
    }
    set g(g) {
        this.y = g;
    }
    get b() {
        return this.z;
    }
    set b(b) {
        this.z = b;
    }
}
