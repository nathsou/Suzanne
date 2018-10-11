import { Vec3 } from "./Vector/Vec3";
import { Vec4 } from "./Vector/Vec4";

export function mat4(s: number): Matrix4;
export function mat4(coeffs: Float32Array): Matrix4;
export function mat4(...coeffs: number[]): Matrix4;
export function mat4(row_1: Vec4, row_2: Vec4, row_3: Vec4, row_4: Vec4): Matrix4;

export function mat4(...args: Vec4[] | number[] | [Float32Array]): Matrix4 {

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

export class Matrix4 {

    private _m: Float32Array;

    constructor(coeffs?: Float32Array) {
        if (coeffs !== undefined) {
            if (coeffs.length !== 16) {
                throw new Error(`Matrix4 constructor requires a Float32Array with 16 elements, got ${coeffs.length}`);
            }

            this._m = coeffs;
        } else {
            this._m = new Float32Array(16);
            this.identity();
        }
    }
    public identity(): Matrix4 {

        this._m.fill(0);
        this._m[0] = 1;
        this._m[5] = 1;
        this._m[10] = 1;
        this._m[15] = 1;

        return this;
    }

    public fill(n: number): void {
        this._m.fill(n);
    }

    public mul(m: Matrix4): Matrix4 {

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

    public translate(v: Vec3): Matrix4 {

        const new_coeffs = new Float32Array(this._m);

        new_coeffs[3] = this._m[3] + this._m[0] * v.x + this._m[1] * v.y + this._m[2] * v.z;
        new_coeffs[7] = this._m[7] + this._m[4] * v.x + this._m[5] * v.y + this._m[6] * v.z;
        new_coeffs[11] = this._m[11] + this._m[8] * v.x + this._m[9] * v.y + this._m[10] * v.z;
        new_coeffs[15] = this._m[15] + this._m[12] * v.x + this._m[13] * v.y + this._m[14] * v.z;

        this._m = new_coeffs;

        return this;
    }

    public rotateX(angle_rad: number): Matrix4 {

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

    public rotateY(angle_rad: number): Matrix4 {

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

    public rotateZ(angle_rad: number): Matrix4 {

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

    public transform(v: Vec4): Vec4 {
        const w = v instanceof Vec4 ? v.w : 1;
        return new Vec4(
            this._m[0] * v.x + this._m[1] * v.y + this._m[2] * v.z + this._m[3] * w,
            this._m[4] * v.x + this._m[5] * v.y + this._m[6] * v.z + this._m[7] * w,
            this._m[8] * v.x + this._m[9] * v.y + this._m[10] * v.z + this._m[11] * w,
            this._m[12] * v.x + this._m[13] * v.y + this._m[14] * v.z + this._m[15] * w
        );
    }

    public det(): number {
        return this._m[1] * this._m[11] * this._m[14] * this._m[4] - this._m[1] * this._m[10] * this._m[15] * this._m[4] - this._m[11] * this._m[13] * this._m[2] * this._m[4] + this._m[10] * this._m[13] * this._m[3] * this._m[4] -
            this._m[0] * this._m[11] * this._m[14] * this._m[5] + this._m[0] * this._m[10] * this._m[15] * this._m[5] + this._m[11] * this._m[12] * this._m[2] * this._m[5] - this._m[10] * this._m[12] * this._m[3] * this._m[5] -
            this._m[1] * this._m[11] * this._m[12] * this._m[6] + this._m[0] * this._m[11] * this._m[13] * this._m[6] + this._m[1] * this._m[10] * this._m[12] * this._m[7] - this._m[0] * this._m[10] * this._m[13] * this._m[7] -
            this._m[15] * this._m[2] * this._m[5] * this._m[8] + this._m[14] * this._m[3] * this._m[5] * this._m[8] + this._m[1] * this._m[15] * this._m[6] * this._m[8] - this._m[13] * this._m[3] * this._m[6] * this._m[8] -
            this._m[1] * this._m[14] * this._m[7] * this._m[8] + this._m[13] * this._m[2] * this._m[7] * this._m[8] + this._m[15] * this._m[2] * this._m[4] * this._m[9] - this._m[14] * this._m[3] * this._m[4] * this._m[9] -
            this._m[0] * this._m[15] * this._m[6] * this._m[9] + this._m[12] * this._m[3] * this._m[6] * this._m[9] + this._m[0] * this._m[14] * this._m[7] * this._m[9] - this._m[12] * this._m[2] * this._m[7] * this._m[9];
    }

    public invert(): Matrix4 {
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

    public static scale(s: number): Matrix4;
    public static scale(v: Vec3): Matrix4;
    public static scale(x: number, y: number, z: number): Matrix4;

    public static scale(...args: number[] | [Vec3 | Vec4]): Matrix4 {
        let x, y, z: number;

        if (args.length === 1) {
            if (typeof args[0] === 'number') {
                x = args[0];
                y = x;
                z = x;
            } else {
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

    public static perspective(fov_rads: number, aspect_ratio: number, near: number, far: number): Matrix4 {
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

    public static screenSpace(width: number, height: number): Matrix4 {
        const m = new Matrix4();
        const w = width / 2;
        const h = height / 2;

        m._m[0] = w;
        m._m[3] = w;
        m._m[5] = h;
        m._m[7] = h;

        return m;
    }

    public static translation(v: Vec3): Matrix4 {
        const m = new Matrix4();

        m._m[3] = v.x;
        m._m[7] = v.y;
        m._m[11] = v.z;

        return m;
    }
}