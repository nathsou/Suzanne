"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = require("./Vec2");
const Vec3_1 = require("./Vec3");
const Vec4_1 = require("./Vec4");
const VecN_1 = require("./VecN");
const Matrix4_1 = require("../Matrix4");
function vec2(...args) {
    switch (args.length) {
        case 0:
            return new Vec2_1.Vec2(0, 0);
        case 1:
            if (typeof args[0] === 'number') {
                return new Vec2_1.Vec2(args[0], args[0]);
            }
            return new Vec2_1.Vec2(args[0].x, args[0].y);
        case 2:
        default:
            return new Vec2_1.Vec2(args[0], args[1]);
    }
}
exports.vec2 = vec2;
function vec3(...args) {
    switch (args.length) {
        case 0:
            return new Vec3_1.Vec3(0, 0, 0);
        case 1:
            if (typeof args[0] === 'number') {
                return new Vec3_1.Vec3(args[0], args[0], args[0]);
            }
            switch (args[0].dims) {
                case 2:
                    return new Vec4_1.Vec4(args[0].x, args[0].y, 0);
                case 3:
                case 4:
                default:
                    return new Vec3_1.Vec3(args[0].x, args[0].y, args[0].z);
            }
        case 2:
            return new Vec3_1.Vec3(args[0], args[1], 0);
        default:
            return new Vec3_1.Vec3(args[0], args[1], args[2]);
    }
}
exports.vec3 = vec3;
function vec4(...args) {
    switch (args.length) {
        case 0:
            return new Vec4_1.Vec4(0, 0, 0, 0);
        case 1:
            if (typeof args[0] === 'number') {
                return new Vec4_1.Vec4(args[0], args[0], args[0], args[0]);
            }
            switch (args[0].dims) {
                case 2:
                    return new Vec4_1.Vec4(args[0].x, args[0].y, args[0].x, args[0].y);
                case 3:
                    return new Vec4_1.Vec4(args[0].x, args[0].y, args[0].z, 1);
                case 4:
                    return new Vec4_1.Vec4(args[0].x, args[0].y, args[0].x, args[0].y);
                default:
                    if (args[0] instanceof VecN_1.VecN) {
                        const [x, y, z, w] = args[0].values;
                        return new Vec4_1.Vec4(x, y, z, w);
                    }
                    throw new Error(`Unexpected vec4 argument: ${args[0]}`);
            }
        case 2:
            if (args[0] instanceof Vec3_1.Vec3) {
                const v = args[0];
                return new Vec4_1.Vec4(v.x, v.y, v.z, args[1]);
            }
            else {
                const [x, y] = args;
                return new Vec4_1.Vec4(x, y, x, y);
            }
        case 3:
            return new Vec4_1.Vec4(args[0], args[1], args[2], 1);
        default:
            return new Vec4_1.Vec4(args[0], args[1], args[2], args[3]);
    }
}
exports.vec4 = vec4;
exports.vecn = (...values) => new VecN_1.VecN(values);
function vec(...values) {
    switch (values.length) {
        case 2:
            return new Vec2_1.Vec2(values[0], values[1]);
        case 3:
            return new Vec3_1.Vec3(values[0], values[1], values[2]);
        case 4:
            return new Vec4_1.Vec4(values[0], values[1], values[2], values[3]);
        default:
            return new VecN_1.VecN(values);
    }
}
exports.vec = vec;
function mat4(...args) {
    if (args.length === 0) {
        return new Matrix4_1.Matrix4();
    }
    if (typeof args[0] === 'number') {
        if (args.length === 1) {
            return Matrix4_1.Matrix4.scale(args[0]);
        }
        if (args.length === 16) {
            return new Matrix4_1.Matrix4(new Float32Array(args));
        }
    }
    if (args[0] instanceof Float32Array) {
        return new Matrix4_1.Matrix4(args[0]);
    }
    if (args[0] instanceof Vec4_1.Vec4 && args.length === 4) {
        const [a, b, c, d] = args;
        return new Matrix4_1.Matrix4(new Float32Array([
            a.x, a.y, a.z, a.w,
            b.x, b.y, b.z, b.w,
            c.x, c.y, c.z, c.w,
            d.x, d.y, d.z, d.w
        ]));
    }
    throw new Error(`Unexpected arguments for mat4: ${args}`);
}
exports.mat4 = mat4;
