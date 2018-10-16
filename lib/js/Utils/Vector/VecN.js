"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector_1 = require("./Vector");
// N-dimensional vector, N >= 4
class VecN {
    constructor(values) {
        if (values.length < 4) {
            throw new Error(`Cannot construct a VecN with less than 4 elements, got : ${values}`);
        }
        this._values = values instanceof Float32Array ? values : new Float32Array(values);
        this._dims = values.length;
    }
    add(v) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] += v._values[i];
        }
        return out;
    }
    sub(v) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] -= v._values[i];
        }
        return out;
    }
    mul(v) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] *= v._values[i];
        }
        return out;
    }
    times(k) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] *= k;
        }
        return out;
    }
    div(v) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] /= v._values[i];
        }
        return out;
    }
    dot(v) {
        let sum = 0;
        for (let i = 0; i < this._dims; i++) {
            sum += this._values[i] * v._values[i];
        }
        return sum;
    }
    mag() {
        let sum = 0;
        for (let i = 0; i < this._dims; i++) {
            sum += Math.pow(this._values[i], 2);
        }
        return Math.sqrt(sum);
    }
    normalize() {
        return this.times(1 / this.mag());
    }
    reflect(N) {
        return N.times(2 * this.dot(N)).sub(this);
    }
    addTimes(v, k) {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] = out._values[i] + v._values[i] * k;
        }
        return out;
    }
    equals(v, eps = Vector_1.EPS) {
        if (this._dims !== v._dims)
            return false;
        for (let i = 0; i < this._dims; i++) {
            if (Math.abs(this._values[i] - v._values[i]) > eps)
                return false;
        }
        return true;
    }
    get dims() {
        return this._dims;
    }
    get values() {
        return this._values;
    }
    set values(new_values) {
        this._values = new_values;
        this._dims = new_values.length;
    }
    get r() {
        return this._values[0];
    }
    get x() {
        return this._values[0];
    }
    set r(r) {
        this._values[0] = r;
    }
    set x(x) {
        this._values[0] = x;
    }
    get g() {
        return this._values[1];
    }
    get y() {
        return this._values[1];
    }
    set g(g) {
        this._values[1] = g;
    }
    set y(y) {
        this._values[1] = y;
    }
    get b() {
        return this._values[2];
    }
    get z() {
        return this._values[2];
    }
    set b(b) {
        this._values[2] = b;
    }
    set z(z) {
        this._values[2] = z;
    }
    get a() {
        return this._values[3];
    }
    get w() {
        return this._values[3];
    }
    set a(a) {
        this._values[3] = a;
    }
    set w(w) {
        this._values[3] = w;
    }
}
exports.VecN = VecN;
