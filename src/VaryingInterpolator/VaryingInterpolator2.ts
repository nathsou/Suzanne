import { Vector } from "../Utils/Vector/Vector";
import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { VaryingInterpolator, VaryingGradient } from "./VaryingInterpolator";

export class VaryingInterpolator2 extends VaryingInterpolator {

    private _inv_dx: number;
    private _inv_dy: number;

    constructor(a: FragmentVertex, b: FragmentVertex, VAO: VertexArray) {
        super(VAO, a, b);

        this._inv_dx = 1 / (b.ndc.x - a.ndc.x);
        this._inv_dy = 1 / (b.ndc.y - a.ndc.y);

        this._computeGradients();
    }

    protected _computeGradients(): void {
        for (const name in this._vertices[0].varyings) {
            const current_varyings = this._VAO.varyings.get(name);
            const varying_a = current_varyings[this._vertices[0].index];
            const varying_b = current_varyings[this._vertices[1].index];

            if (typeof varying_a === 'number') {
                this._varyings.set(
                    name,
                    this._computeFloatGradient(
                        varying_a,
                        varying_b as number
                    )
                );
            } else {
                this._varyings.set(
                    name,
                    this._computeVecGradient(
                        varying_a as Vector,
                        varying_b as Vector
                    )
                );
            }
        }
    }

    protected _computeFloatGradient(a: number, b: number): VaryingGradient<number> {

        const x_step = (b - a) * this._inv_dx;
        const y_step = (b - a) * this._inv_dy;

        return { x_step, y_step };
    }

    protected _computeVecGradient<T extends Vector>(a: T, b: T): VaryingGradient<T> {

        const x_step = b.sub(a).times(this._inv_dx) as T;
        const y_step = b.sub(a).times(this._inv_dy) as T;

        return { x_step, y_step };
    }

}