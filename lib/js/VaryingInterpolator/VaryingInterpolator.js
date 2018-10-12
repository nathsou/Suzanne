import { interpolableAdd } from "../Utils/MathUtils";
export class VaryingInterpolator {
    constructor(VAO, ...vertices) {
        this._varyings = new Map();
        this._vertices = vertices;
        this._VAO = VAO;
    }
    stepX(varying) {
        return (varying.current = interpolableAdd(varying.current, varying.x_step));
    }
    get varyings() {
        return this._varyings;
    }
    get VAO() {
        return this._VAO;
    }
}
