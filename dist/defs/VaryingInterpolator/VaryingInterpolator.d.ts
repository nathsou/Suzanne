import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { Vector } from "../Utils/Vector/Vector";
export declare type InterpolableType = number | Vector;
export interface VaryingGradient<T extends InterpolableType> {
    readonly x_step: T;
    readonly y_step: T;
    readonly step?: T;
    current?: T;
}
export declare abstract class VaryingInterpolator {
    protected _varyings: Map<string, VaryingGradient<InterpolableType>>;
    protected _vertices: FragmentVertex[];
    protected _VAO: VertexArray;
    constructor(VAO: VertexArray, ...vertices: FragmentVertex[]);
    stepX(varying: VaryingGradient<InterpolableType>): InterpolableType;
    readonly varyings: Map<string, VaryingGradient<InterpolableType>>;
    readonly VAO: VertexArray;
    protected abstract _computeGradients(): void;
}
