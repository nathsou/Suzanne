"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("./Vector");
class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.dims = 4;
    }
    add(v) {
        return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    sub(v) {
        return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    mul(v) {
        return new Vec4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
    }
    times(k) {
        return new Vec4(this.x * k, this.y * k, this.z * k, this.w * k);
    }
    div(v) {
        return new Vec4(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) + Math.pow(this.w, 2));
    }
    normalize() {
        return this.times(1 / this.mag());
    }
    reflect(N) {
        return N.times(2 * this.dot(N)).sub(this);
    }
    addTimes(v, k) {
        return new Vec4(this.x + v.x * k, this.y + v.y * k, this.z + v.z * k, this.w + v.w * k);
    }
    equals(v, eps = Vector_1.EPS) {
        return Math.abs(this.x - v.x) < eps &&
            Math.abs(this.y - v.y) < eps &&
            Math.abs(this.z - v.z) < eps &&
            Math.abs(this.w - v.w) < eps;
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
    get a() {
        return this.w;
    }
    set a(a) {
        this.w = a;
    }
}
exports.Vec4 = Vec4;
