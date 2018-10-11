import { interpolableAdd } from "../Utils/MathUtils";
import { FragmentVertex } from "../Vertex";
import { VertexArray } from "../VertexArray";
import { Vector } from "../Utils/Vector/Vector";

export type InterpolableType = number | Vector;

export interface VaryingGradient<T extends InterpolableType> {
    readonly x_step: T,
    readonly y_step: T,
    readonly step?: T,
    current?: T
}

export abstract class VaryingInterpolator {

    protected _varyings: Map<string, VaryingGradient<InterpolableType>>;
    protected _vertices: FragmentVertex[];
    protected _VAO: VertexArray;

    constructor(VAO: VertexArray, ...vertices: FragmentVertex[]) {
        this._varyings = new Map<string, VaryingGradient<InterpolableType>>();
        this._vertices = vertices;
        this._VAO = VAO;
    }

    public stepX(varying: VaryingGradient<InterpolableType>): InterpolableType {
        return (varying.current = interpolableAdd(varying.current, varying.x_step));
    }

    public get varyings(): Map<string, VaryingGradient<InterpolableType>> {
        return this._varyings;
    }

    public get VAO(): VertexArray {
        return this._VAO;
    }

    protected abstract _computeGradients(): void;
}