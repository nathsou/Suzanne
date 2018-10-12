import { interpolableAdd, interpolableAddTimes } from "./Utils/MathUtils";
export class Edge {
    constructor(from, to, gradient) {
        this._y_start = Math.ceil(from.ndc.y);
        this._y_end = Math.ceil(to.ndc.y);
        this._interpolator = gradient;
        this._varyings = new Map();
        this._varying_names = [...gradient.varyings.keys()];
        this._from = from;
        this._to = to;
        const y_offset = this._y_start - from.ndc.y;
        this._x_step = (from.ndc.x - to.ndc.x) / (from.ndc.y - to.ndc.y);
        this._x = from.ndc.x + y_offset * this._x_step;
        const x_offset = this._x - from.ndc.x;
        for (let i = 0; i < this._varying_names.length; i++) {
            const name = this._varying_names[i];
            const varying = gradient.varyings.get(name);
            this._varyings.set(name, {
                current: interpolableAddTimes(interpolableAddTimes(gradient.VAO.varyings.get(name)[from.index], varying.x_step, x_offset), varying.y_step, y_offset),
                step: interpolableAddTimes(varying.y_step, varying.x_step, this._x_step)
            });
        }
    }
    step() {
        this._x += this._x_step;
        for (let i = 0; i < this._varying_names.length; i++) {
            const name = this._varying_names[i];
            const varying = this._varyings.get(name);
            varying.current = interpolableAdd(varying.current, varying.step);
        }
    }
    get x() {
        return this._x;
    }
    get y_start() {
        return this._y_start;
    }
    get y_end() {
        return this._y_end;
    }
    get from() {
        return this._from;
    }
    get to() {
        return this._to;
    }
    get varyings() {
        return this._varyings;
    }
    get gradient() {
        return this._interpolator;
    }
}
