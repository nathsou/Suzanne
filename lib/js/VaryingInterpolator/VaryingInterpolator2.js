"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VaryingInterpolator_1 = require("./VaryingInterpolator");
class VaryingInterpolator2 extends VaryingInterpolator_1.VaryingInterpolator {
    constructor(a, b, VAO) {
        super(VAO, a, b);
        this._inv_dx = 1 / (b.ndc.x - a.ndc.x);
        this._inv_dy = 1 / (b.ndc.y - a.ndc.y);
        this._computeGradients();
    }
    _computeGradients() {
        for (const name in this._vertices[0].varyings) {
            const current_varyings = this._VAO.varyings.get(name);
            const varying_a = current_varyings[this._vertices[0].index];
            const varying_b = current_varyings[this._vertices[1].index];
            if (typeof varying_a === 'number') {
                this._varyings.set(name, this._computeFloatGradient(varying_a, varying_b));
            }
            else {
                this._varyings.set(name, this._computeVecGradient(varying_a, varying_b));
            }
        }
    }
    _computeFloatGradient(a, b) {
        const x_step = (b - a) * this._inv_dx;
        const y_step = (b - a) * this._inv_dy;
        return { x_step, y_step };
    }
    _computeVecGradient(a, b) {
        const x_step = b.sub(a).times(this._inv_dx);
        const y_step = b.sub(a).times(this._inv_dy);
        return { x_step, y_step };
    }
}
exports.VaryingInterpolator2 = VaryingInterpolator2;
