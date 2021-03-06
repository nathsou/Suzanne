import { Vector, EPS } from "./Vector";

// N-dimensional vector, N >= 4
export class VecN implements Vector {

    private _values: Float32Array;
    private _dims: number;

    constructor(values: (number[] | Float32Array)) {
        if (values.length < 4) {
            throw new Error(`Cannot construct a VecN with less than 4 elements, got : ${values}`);
        }
        this._values = values instanceof Float32Array ? values : new Float32Array(values);
        this._dims = values.length;
    }

    public add(v: VecN): VecN {
        const out = new VecN(this._values);

        for (let i = 0; i < this._dims; i++) {
            out._values[i] += v._values[i];
        }

        return out;
    }

    public sub(v: VecN): VecN {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] -= v._values[i];
        }

        return out;
    }

    public mul(v: VecN): VecN {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] *= v._values[i];
        }
        return out;
    }

    public times(k: number): VecN {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] *= k;
        }
        return out;
    }

    public div(v: VecN): VecN {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] /= v._values[i];
        }
        return out;
    }

    public dot(v: VecN): number {
        let sum = 0;

        for (let i = 0; i < this._dims; i++) {
            sum += this._values[i] * v._values[i];
        }

        return sum;
    }

    public mag(): number {
        let sum = 0;
        for (let i = 0; i < this._dims; i++) {
            sum += this._values[i] ** 2;
        }

        return Math.sqrt(sum);
    }

    public normalize(): VecN {
        return this.times(1 / this.mag());
    }

    public reflect(N: VecN): VecN {
        return N.times(2 * this.dot(N)).sub(this);
    }

    public addTimes(v: VecN, k: number): Vector {
        const out = new VecN(this._values);
        for (let i = 0; i < this._dims; i++) {
            out._values[i] = out._values[i] + v._values[i] * k;
        }
        return out;
    }

    public equals(v: VecN, eps = EPS) {
        if (this._dims !== v._dims) return false;

        for (let i = 0; i < this._dims; i++) {
            if (Math.abs(this._values[i] - v._values[i]) > eps) return false;
        }

        return true;
    }

    public get dims(): number {
        return this._dims;
    }

    public get values(): Float32Array {
        return this._values;
    }

    public set values(new_values: Float32Array) {
        this._values = new_values;
        this._dims = new_values.length;
    }

    public get r(): number {
        return this._values[0];
    }

    public get x(): number {
        return this._values[0];
    }

    public set r(r: number) {
        this._values[0] = r;
    }

    public set x(x: number) {
        this._values[0] = x;
    }

    public get g(): number {
        return this._values[1];
    }

    public get y(): number {
        return this._values[1];
    }

    public set g(g: number) {
        this._values[1] = g;
    }

    public set y(y: number) {
        this._values[1] = y;
    }

    public get b(): number {
        return this._values[2];
    }

    public get z(): number {
        return this._values[2];
    }

    public set b(b: number) {
        this._values[2] = b;
    }

    public set z(z: number) {
        this._values[2] = z;
    }

    public get a(): number {
        return this._values[3];
    }

    public get w(): number {
        return this._values[3];
    }

    public set a(a: number) {
        this._values[3] = a;
    }

    public set w(w: number) {
        this._values[3] = w;
    }
}