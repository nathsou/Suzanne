"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MathUtils_1 = require("../Utils/MathUtils");
class VaryingInterpolator {
    constructor(VAO, ...vertices) {
        this._varyings = new Map();
        this._vertices = vertices;
        this._VAO = VAO;
    }
    stepX(varying) {
        return (varying.current = MathUtils_1.interpolableAdd(varying.current, varying.x_step));
    }
    get varyings() {
        return this._varyings;
    }
    get VAO() {
        return this._VAO;
    }
}
exports.VaryingInterpolator = VaryingInterpolator;
