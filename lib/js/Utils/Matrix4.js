"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec4_1 = require("./Vector/Vec4");
class Matrix4 {
    constructor(coeffs) {
        if (coeffs !== undefined) {
            if (coeffs.length !== 16) {
                throw new Error(`Matrix4 constructor requires a Float32Array with 16 elements, got ${coeffs.length}`);
            }
            this._m = coeffs;
        }
        else {
            this._m = new Float32Array(16);
            this.identity();
        }
    }
    identity() {
        this._m.fill(0);
        this._m[0] = 1;
        this._m[5] = 1;
        this._m[10] = 1;
        this._m[15] = 1;
        return this;
    }
    fill(n) {
        this._m.fill(n);
    }
    mul(m) {
        const prod = new Matrix4();
        const b = m._m;
        prod._m[0] = this._m[0] * b[0] + this._m[1] * b[4] + this._m[2] * b[8] + this._m[3] * b[12];
        prod._m[1] = this._m[0] * b[1] + this._m[1] * b[5] + this._m[2] * b[9] + this._m[3] * b[13];
        prod._m[2] = this._m[0] * b[2] + this._m[1] * b[6] + this._m[2] * b[10] + this._m[3] * b[14];
        prod._m[3] = this._m[0] * b[3] + this._m[1] * b[7] + this._m[2] * b[11] + this._m[3] * b[15];
        prod._m[4] = this._m[4] * b[0] + this._m[5] * b[4] + this._m[6] * b[8] + this._m[7] * b[12];
        prod._m[5] = this._m[4] * b[1] + this._m[5] * b[5] + this._m[6] * b[9] + this._m[7] * b[13];
        prod._m[6] = this._m[4] * b[2] + this._m[5] * b[6] + this._m[6] * b[10] + this._m[7] * b[14];
        prod._m[7] = this._m[4] * b[3] + this._m[5] * b[7] + this._m[6] * b[11] + this._m[7] * b[15];
        prod._m[8] = this._m[8] * b[0] + this._m[9] * b[4] + this._m[10] * b[8] + this._m[11] * b[12];
        prod._m[9] = this._m[8] * b[1] + this._m[9] * b[5] + this._m[10] * b[9] + this._m[11] * b[13];
        prod._m[10] = this._m[8] * b[2] + this._m[9] * b[6] + this._m[10] * b[10] + this._m[11] * b[14];
        prod._m[11] = this._m[8] * b[3] + this._m[9] * b[7] + this._m[10] * b[11] + this._m[11] * b[15];
        prod._m[12] = this._m[12] * b[0] + this._m[13] * b[4] + this._m[14] * b[8] + this._m[15] * b[12];
        prod._m[13] = this._m[12] * b[1] + this._m[13] * b[5] + this._m[14] * b[9] + this._m[15] * b[13];
        prod._m[14] = this._m[12] * b[2] + this._m[13] * b[6] + this._m[14] * b[10] + this._m[15] * b[14];
        prod._m[15] = this._m[12] * b[3] + this._m[13] * b[7] + this._m[14] * b[11] + this._m[15] * b[15];
        return prod;
    }
    translate(v) {
        const new_coeffs = new Float32Array(this._m);
        new_coeffs[3] = this._m[3] + this._m[0] * v.x + this._m[1] * v.y + this._m[2] * v.z;
        new_coeffs[7] = this._m[7] + this._m[4] * v.x + this._m[5] * v.y + this._m[6] * v.z;
        new_coeffs[11] = this._m[11] + this._m[8] * v.x + this._m[9] * v.y + this._m[10] * v.z;
        new_coeffs[15] = this._m[15] + this._m[12] * v.x + this._m[13] * v.y + this._m[14] * v.z;
        this._m = new_coeffs;
        return this;
    }
    rotateX(angle_rad) {
        const new_coeffs = new Float32Array(16);
        const c = Math.cos(angle_rad);
        const s = Math.sin(angle_rad);
        new_coeffs[0] = this._m[0];
        new_coeffs[1] = this._m[1] * c + this._m[2] * s;
        new_coeffs[2] = this._m[2] * c - this._m[1] * s;
        new_coeffs[3] = this._m[3];
        new_coeffs[4] = this._m[4];
        new_coeffs[5] = this._m[5] * c + this._m[6] * s;
        new_coeffs[6] = this._m[6] * c - this._m[5] * s;
        new_coeffs[7] = this._m[7];
        new_coeffs[8] = this._m[8];
        new_coeffs[9] = this._m[9] * c + this._m[10] * s;
        new_coeffs[10] = this._m[10] * c - this._m[9] * s;
        new_coeffs[11] = this._m[11];
        new_coeffs[12] = this._m[12];
        new_coeffs[13] = this._m[13] * c + this._m[14] * s;
        new_coeffs[14] = this._m[14] * c - this._m[13] * s;
        new_coeffs[15] = this._m[15];
        this._m = new_coeffs;
        return this;
    }
    rotateY(angle_rad) {
        const new_coeffs = new Float32Array(16);
        const c = Math.cos(angle_rad);
        const s = Math.sin(angle_rad);
        new_coeffs[0] = this._m[0] * c - this._m[2] * s;
        new_coeffs[1] = this._m[1];
        new_coeffs[2] = this._m[2] * c + this._m[0] * s;
        new_coeffs[3] = this._m[3];
        new_coeffs[4] = this._m[4] * c - this._m[6] * s;
        new_coeffs[5] = this._m[5];
        new_coeffs[6] = this._m[6] * c + this._m[4] * s;
        new_coeffs[7] = this._m[7];
        new_coeffs[8] = this._m[8] * c - this._m[10] * s;
        new_coeffs[9] = this._m[9];
        new_coeffs[10] = this._m[10] * c + this._m[8] * s;
        new_coeffs[11] = this._m[11];
        new_coeffs[12] = this._m[12] * c - this._m[14] * s;
        new_coeffs[13] = this._m[13];
        new_coeffs[14] = this._m[14] * c + this._m[12] * s;
        new_coeffs[15] = this._m[15];
        this._m = new_coeffs;
        return this;
    }
    rotateZ(angle_rad) {
        const new_coeffs = new Float32Array(16);
        const c = Math.cos(angle_rad);
        const s = Math.sin(angle_rad);
        new_coeffs[0] = this._m[0] * c + this._m[1] * s;
        new_coeffs[1] = this._m[1] * c - this._m[0] * s;
        new_coeffs[2] = this._m[2];
        new_coeffs[3] = this._m[3];
        new_coeffs[4] = this._m[4] * c + this._m[5] * s;
        new_coeffs[5] = this._m[5] * c - this._m[4] * s;
        new_coeffs[6] = this._m[6];
        new_coeffs[7] = this._m[7];
        new_coeffs[8] = this._m[8] * c + this._m[9] * s;
        new_coeffs[9] = this._m[9] * c - this._m[8] * s;
        new_coeffs[10] = this._m[10];
        new_coeffs[11] = this._m[11];
        new_coeffs[12] = this._m[12] * c + this._m[13] * s;
        new_coeffs[13] = this._m[13] * c - this._m[12] * s;
        new_coeffs[14] = this._m[14];
        new_coeffs[15] = this._m[15];
        this._m = new_coeffs;
        return this;
    }
    transform(v) {
        const w = v instanceof Vec4_1.Vec4 ? v.w : 1;
        return new Vec4_1.Vec4(this._m[0] * v.x + this._m[1] * v.y + this._m[2] * v.z + this._m[3] * w, this._m[4] * v.x + this._m[5] * v.y + this._m[6] * v.z + this._m[7] * w, this._m[8] * v.x + this._m[9] * v.y + this._m[10] * v.z + this._m[11] * w, this._m[12] * v.x + this._m[13] * v.y + this._m[14] * v.z + this._m[15] * w);
    }
    det() {
        return this._m[1] * this._m[11] * this._m[14] * this._m[4] - this._m[1] * this._m[10] * this._m[15] * this._m[4] - this._m[11] * this._m[13] * this._m[2] * this._m[4] + this._m[10] * this._m[13] * this._m[3] * this._m[4] -
            this._m[0] * this._m[11] * this._m[14] * this._m[5] + this._m[0] * this._m[10] * this._m[15] * this._m[5] + this._m[11] * this._m[12] * this._m[2] * this._m[5] - this._m[10] * this._m[12] * this._m[3] * this._m[5] -
            this._m[1] * this._m[11] * this._m[12] * this._m[6] + this._m[0] * this._m[11] * this._m[13] * this._m[6] + this._m[1] * this._m[10] * this._m[12] * this._m[7] - this._m[0] * this._m[10] * this._m[13] * this._m[7] -
            this._m[15] * this._m[2] * this._m[5] * this._m[8] + this._m[14] * this._m[3] * this._m[5] * this._m[8] + this._m[1] * this._m[15] * this._m[6] * this._m[8] - this._m[13] * this._m[3] * this._m[6] * this._m[8] -
            this._m[1] * this._m[14] * this._m[7] * this._m[8] + this._m[13] * this._m[2] * this._m[7] * this._m[8] + this._m[15] * this._m[2] * this._m[4] * this._m[9] - this._m[14] * this._m[3] * this._m[4] * this._m[9] -
            this._m[0] * this._m[15] * this._m[6] * this._m[9] + this._m[12] * this._m[3] * this._m[6] * this._m[9] + this._m[0] * this._m[14] * this._m[7] * this._m[9] - this._m[12] * this._m[2] * this._m[7] * this._m[9];
    }
    invert() {
        const d = this.det();
        const inv = new Matrix4();
        inv._m[0] = (-this._m[11] * this._m[14] * this._m[5] + this._m[10] * this._m[15] * this._m[5] + this._m[11] * this._m[13] * this._m[6] - this._m[10] * this._m[13] * this._m[7] - this._m[15] * this._m[6] * this._m[9] + this._m[14] * this._m[7] * this._m[9]) / d;
        inv._m[1] = (this._m[1] * this._m[11] * this._m[14] - this._m[1] * this._m[10] * this._m[15] - this._m[11] * this._m[13] * this._m[2] + this._m[10] * this._m[13] * this._m[3] + this._m[15] * this._m[2] * this._m[9] - this._m[14] * this._m[3] * this._m[9]) / d;
        inv._m[2] = (-this._m[15] * this._m[2] * this._m[5] + this._m[14] * this._m[3] * this._m[5] + this._m[1] * this._m[15] * this._m[6] - this._m[13] * this._m[3] * this._m[6] - this._m[1] * this._m[14] * this._m[7] + this._m[13] * this._m[2] * this._m[7]) / d;
        inv._m[3] = (this._m[11] * this._m[2] * this._m[5] - this._m[10] * this._m[3] * this._m[5] - this._m[1] * this._m[11] * this._m[6] + this._m[1] * this._m[10] * this._m[7] + this._m[3] * this._m[6] * this._m[9] - this._m[2] * this._m[7] * this._m[9]) / d;
        inv._m[4] = (this._m[11] * this._m[14] * this._m[4] - this._m[10] * this._m[15] * this._m[4] - this._m[11] * this._m[12] * this._m[6] + this._m[10] * this._m[12] * this._m[7] + this._m[15] * this._m[6] * this._m[8] - this._m[14] * this._m[7] * this._m[8]) / d;
        inv._m[5] = (-this._m[0] * this._m[11] * this._m[14] + this._m[0] * this._m[10] * this._m[15] + this._m[11] * this._m[12] * this._m[2] - this._m[10] * this._m[12] * this._m[3] - this._m[15] * this._m[2] * this._m[8] + this._m[14] * this._m[3] * this._m[8]) / d;
        inv._m[6] = (this._m[15] * this._m[2] * this._m[4] - this._m[14] * this._m[3] * this._m[4] - this._m[0] * this._m[15] * this._m[6] + this._m[12] * this._m[3] * this._m[6] + this._m[0] * this._m[14] * this._m[7] - this._m[12] * this._m[2] * this._m[7]) / d;
        inv._m[7] = (-this._m[11] * this._m[2] * this._m[4] + this._m[10] * this._m[3] * this._m[4] + this._m[0] * this._m[11] * this._m[6] - this._m[0] * this._m[10] * this._m[7] - this._m[3] * this._m[6] * this._m[8] + this._m[2] * this._m[7] * this._m[8]) / d;
        inv._m[8] = (-this._m[11] * this._m[13] * this._m[4] + this._m[11] * this._m[12] * this._m[5] - this._m[15] * this._m[5] * this._m[8] + this._m[13] * this._m[7] * this._m[8] + this._m[15] * this._m[4] * this._m[9] - this._m[12] * this._m[7] * this._m[9]) / d;
        inv._m[9] = (-this._m[1] * this._m[11] * this._m[12] + this._m[0] * this._m[11] * this._m[13] + this._m[1] * this._m[15] * this._m[8] - this._m[13] * this._m[3] * this._m[8] - this._m[0] * this._m[15] * this._m[9] + this._m[12] * this._m[3] * this._m[9]) / d;
        inv._m[10] = (-this._m[1] * this._m[15] * this._m[4] + this._m[13] * this._m[3] * this._m[4] + this._m[0] * this._m[15] * this._m[5] - this._m[12] * this._m[3] * this._m[5] + this._m[1] * this._m[12] * this._m[7] - this._m[0] * this._m[13] * this._m[7]) / d;
        inv._m[11] = (this._m[1] * this._m[11] * this._m[4] - this._m[0] * this._m[11] * this._m[5] + this._m[3] * this._m[5] * this._m[8] - this._m[1] * this._m[7] * this._m[8] - this._m[3] * this._m[4] * this._m[9] + this._m[0] * this._m[7] * this._m[9]) / d;
        inv._m[12] = (this._m[10] * this._m[13] * this._m[4] - this._m[10] * this._m[12] * this._m[5] + this._m[14] * this._m[5] * this._m[8] - this._m[13] * this._m[6] * this._m[8] - this._m[14] * this._m[4] * this._m[9] + this._m[12] * this._m[6] * this._m[9]) / d;
        inv._m[13] = (this._m[1] * this._m[10] * this._m[12] - this._m[0] * this._m[10] * this._m[13] - this._m[1] * this._m[14] * this._m[8] + this._m[13] * this._m[2] * this._m[8] + this._m[0] * this._m[14] * this._m[9] - this._m[12] * this._m[2] * this._m[9]) / d;
        inv._m[14] = (this._m[1] * this._m[14] * this._m[4] - this._m[13] * this._m[2] * this._m[4] - this._m[0] * this._m[14] * this._m[5] + this._m[12] * this._m[2] * this._m[5] - this._m[1] * this._m[12] * this._m[6] + this._m[0] * this._m[13] * this._m[6]) / d;
        inv._m[15] = (-this._m[1] * this._m[10] * this._m[4] + this._m[0] * this._m[10] * this._m[5] - this._m[2] * this._m[5] * this._m[8] + this._m[1] * this._m[6] * this._m[8] + this._m[2] * this._m[4] * this._m[9] - this._m[0] * this._m[6] * this._m[9]) / d;
        return inv;
    }
    static scale(...args) {
        let x, y, z;
        if (args.length === 1) {
            if (typeof args[0] === 'number') {
                x = args[0];
                y = x;
                z = x;
            }
            else {
                x = args[0].x;
                y = args[0].y;
                z = args[0].z;
            }
        }
        const m = new Matrix4();
        m._m[0] = x;
        m._m[5] = y;
        m._m[10] = z;
        m._m[15] = 1;
        return m;
    }
    static perspective(fov_rads, aspect_ratio, near, far) {
        const m = new Matrix4();
        const tan_half_fov = Math.tan(fov_rads / 2);
        const near_minus_far = near - far;
        m._m[0] = 1 / (tan_half_fov * aspect_ratio);
        m._m[5] = 1 / tan_half_fov;
        m._m[10] = (-near - far) / near_minus_far;
        m._m[11] = 2 * far * near / near_minus_far;
        m._m[14] = 1;
        m._m[15] = 0;
        return m;
    }
    static screenSpace(width, height) {
        const m = new Matrix4();
        const w = width / 2;
        const h = height / 2;
        m._m[0] = w;
        m._m[3] = w;
        m._m[5] = h;
        m._m[7] = h;
        return m;
    }
    static translation(v) {
        const m = new Matrix4();
        m._m[3] = v.x;
        m._m[7] = v.y;
        m._m[11] = v.z;
        return m;
    }
}
exports.Matrix4 = Matrix4;
