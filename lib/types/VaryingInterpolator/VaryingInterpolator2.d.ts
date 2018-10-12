import { Vector } from "../Utils/Vector/Vector";
import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { VaryingInterpolator, VaryingGradient } from "./VaryingInterpolator";
export declare class VaryingInterpolator2 extends VaryingInterpolator {
    private _inv_dx;
    private _inv_dy;
    constructor(a: FragmentVertex, b: FragmentVertex, VAO: VertexArray);
    protected _computeGradients(): void;
    protected _computeFloatGradient(a: number, b: number): VaryingGradient<number>;
    protected _computeVecGradient<T extends Vector>(a: T, b: T): VaryingGradient<T>;
}
