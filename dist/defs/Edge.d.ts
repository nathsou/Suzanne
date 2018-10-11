import { VaryingInterpolator, InterpolableType } from "./VaryingInterpolator/VaryingInterpolator";
import { FragmentVertex } from "./Vertex";
export interface EdgeInterpolation<T extends InterpolableType> {
    current: T;
    step: T;
}
export declare class Edge {
    private _x;
    private _x_step;
    private _y_start;
    private _y_end;
    private _interpolator;
    private _varyings;
    private _varying_names;
    private _from;
    private _to;
    constructor(from: FragmentVertex, to: FragmentVertex, gradient: VaryingInterpolator);
    step(): void;
    readonly x: number;
    readonly y_start: number;
    readonly y_end: number;
    readonly from: FragmentVertex;
    readonly to: FragmentVertex;
    readonly varyings: Map<string, EdgeInterpolation<InterpolableType>>;
    readonly gradient: VaryingInterpolator;
}
