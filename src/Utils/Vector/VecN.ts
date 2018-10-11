import { Vector, EPS } from "./Vector";

export const vecn = (...values: number[]) => new VecN(values);

// N-dimensional vector
export class VecN implements Vector {

    private _values: Float32Array;
    private _dims: number;

    constructor(values: (number[] | Float32Array)) {
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
}