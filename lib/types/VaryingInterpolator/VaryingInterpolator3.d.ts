import { Vector } from "../Utils/Vector/Vector";
import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { VaryingGradient, VaryingInterpolator } from "./VaryingInterpolator";
export declare class VaryingInterpolator3 extends VaryingInterpolator {
    private _inv_dx;
    private _inv_dy;
    constructor(a: FragmentVertex, b: FragmentVertex, c: FragmentVertex, VAO: VertexArray);
    protected _computeGradients(): void;
    protected _computeFloatGradient(a: number, b: number, c: number): VaryingGradient<number>;
    protected _computeVecGradient<T extends Vector>(a: T, b: T, c: T): VaryingGradient<T>;
}
