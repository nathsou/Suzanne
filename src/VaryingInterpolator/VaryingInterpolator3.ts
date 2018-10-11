
import { interpolableTimes } from "../Utils/MathUtils";
import { Vector } from "../Utils/Vector/Vector";
import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { VaryingInterpolator, VaryingGradient } from "./VaryingInterpolator";
import { vecn } from "../Utils/Vector/VecN";

export class VaryingInterpolator3 extends VaryingInterpolator {

    private _inv_dx: number;
    private _inv_dy: number;

    constructor(a: FragmentVertex, b: FragmentVertex, c: FragmentVertex, VAO: VertexArray) {
        super(VAO, a, b, c);

        this._inv_dx = 1 /
            (((b.ndc.x - c.ndc.x) *
                (a.ndc.y - c.ndc.y)) -
                ((a.ndc.x - c.ndc.x) *
                    (b.ndc.y - c.ndc.y)));

        this._inv_dy = -this._inv_dx;

        this._computeGradients();
    }

    protected _computeGradients(): void {

        // http://web.cs.ucdavis.edu/~amenta/s12/perspectiveCorrect.pdf
        const one_over_z_a = this._vertices[0].ndc.w as number;
        const one_over_z_b = this._vertices[1].ndc.w as number;
        const one_over_z_c = this._vertices[2].ndc.w as number;

        for (const name in this._vertices[0].varyings) {
            const current_varyings = this._VAO.varyings.get(name);

            //apply perspective correct texture mapping:
            if (name !== '__ndc') {
                current_varyings[this._vertices[0].index] =
                    interpolableTimes(current_varyings[this._vertices[0].index], one_over_z_a);
                current_varyings[this._vertices[1].index] =
                    interpolableTimes(current_varyings[this._vertices[1].index], one_over_z_b);
                current_varyings[this._vertices[2].index] =
                    interpolableTimes(current_varyings[this._vertices[2].index], one_over_z_c);
            }

            let varying_a = current_varyings[this._vertices[0].index];
            let varying_b = current_varyings[this._vertices[1].index];
            let varying_c = current_varyings[this._vertices[2].index];


            if (typeof varying_a === 'number') {
                this._varyings.set(
                    name,
                    this._computeFloatGradient(
                        varying_a,
                        varying_b as number,
                        varying_c as number
                    )
                );
            } else {
                this._varyings.set(
                    name,
                    this._computeVecGradient(
                        varying_a as Vector,
                        varying_b as Vector,
                        varying_c as Vector
                    )
                );
            }
        }
    }


    protected _computeFloatGradient(a: number, b: number, c: number): VaryingGradient<number> {

        // const ac_delta_y = this._vertices[0].ndc_pos.y - this._vertices[2].ndc_pos.y;
        // const bc_delta_y = this._vertices[1].ndc_pos.y - this._vertices[2].ndc_pos.y;

        // const x_step = (b - c) * (ac_delta_y) - ((a - c) * (bc_delta_y)) * (this._inv_dx);

        // const ac_delta_x = this._vertices[0].ndc_pos.x - this._vertices[2].ndc_pos.x;
        // const bc_delta_x = this._vertices[1].ndc_pos.x - this._vertices[2].ndc_pos.x;

        // const y_step = (b - c) * (ac_delta_x) - ((a - c) * (bc_delta_x)) * (this._inv_dy);

        const cmp = this._computeVecGradient(vecn(a), vecn(b), vecn(c));

        return {
            x_step: cmp.x_step.values[0],
            y_step: cmp.y_step.values[0]
        };

        // return { x_step, y_step };
    }

    protected _computeVecGradient<T extends Vector>(a: T, b: T, c: T): VaryingGradient<T> {

        const ac_delta_y = this._vertices[0].ndc.y - this._vertices[2].ndc.y;
        const bc_delta_y = this._vertices[1].ndc.y - this._vertices[2].ndc.y;

        const b_sub_c = b.sub(c);
        const a_sub_c = a.sub(c);

        const x_step = b_sub_c.times(ac_delta_y).sub(a_sub_c.times(bc_delta_y)).times(this._inv_dx) as T;

        const ac_delta_x = this._vertices[0].ndc.x - this._vertices[2].ndc.x;
        const bc_delta_x = this._vertices[1].ndc.x - this._vertices[2].ndc.x;

        const y_step = b_sub_c.times(ac_delta_x).sub(a_sub_c.times(bc_delta_x)).times(this._inv_dy) as T;

        return { x_step, y_step };
    }

}