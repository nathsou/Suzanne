import { Vec3 } from "./Vector/Vec3";
import { Vec4 } from "./Vector/Vec4";
export declare class Matrix4 {
    private _m;
    constructor(coeffs?: Float32Array);
    identity(): Matrix4;
    fill(n: number): void;
    mul(m: Matrix4): Matrix4;
    translate(v: Vec3): Matrix4;
    rotateX(angle_rad: number): Matrix4;
    rotateY(angle_rad: number): Matrix4;
    rotateZ(angle_rad: number): Matrix4;
    transform(v: Vec4): Vec4;
    det(): number;
    invert(): Matrix4;
    static scale(s: number): Matrix4;
    static scale(v: Vec3): Matrix4;
    static scale(x: number, y: number, z: number): Matrix4;
    static perspective(fov_rads: number, aspect_ratio: number, near: number, far: number): Matrix4;
    static screenSpace(width: number, height: number): Matrix4;
    static translation(v: Vec3): Matrix4;
}
