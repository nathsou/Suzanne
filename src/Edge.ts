import { interpolableAdd, interpolableAddTimes } from "./Utils/MathUtils";
import { VaryingInterpolator, InterpolableType } from "./VaryingInterpolator/VaryingInterpolator";
import { FragmentVertex } from "./Vertex";

export interface EdgeInterpolation<T extends InterpolableType> {
    current: T,
    step: T
}

export class Edge {
    private _x: number;
    private _x_step: number;
    private _y_start: number;
    private _y_end: number;
    private _interpolator: VaryingInterpolator;
    private _varyings: Map<string, EdgeInterpolation<InterpolableType>>;
    private _varying_names: string[];

    private _from: FragmentVertex;
    private _to: FragmentVertex;

    constructor(from: FragmentVertex, to: FragmentVertex, gradient: VaryingInterpolator) {
        this._y_start = Math.ceil(from.ndc.y);
        this._y_end = Math.ceil(to.ndc.y);
        this._interpolator = gradient;
        this._varyings = new Map<string, EdgeInterpolation<InterpolableType>>();
        this._varying_names = [...gradient.varyings.keys()];
        this._from = from;
        this._to = to;

        const y_offset = this._y_start - from.ndc.y;

        this._x_step = (from.ndc.x - to.ndc.x) / (from.ndc.y - to.ndc.y);
        this._x = from.ndc.x + y_offset * this._x_step;
        const x_offset = this._x - from.ndc.x;

        for (let i = 0; i < this._varying_names.length; i++) {
            const name = this._varying_names[i];
            const varying = gradient.varyings.get(name);

            this._varyings.set(name, {
                current: interpolableAddTimes(
                    interpolableAddTimes(
                        gradient.VAO.varyings.get(name)[from.index],
                        varying.x_step,
                        x_offset
                    ),
                    varying.y_step,
                    y_offset
                ),

                step: interpolableAddTimes(varying.y_step, varying.x_step, this._x_step)
            });
        }

    }

    public step(): void {
        this._x += this._x_step;

        for (let i = 0; i < this._varying_names.length; i++) {
            const name = this._varying_names[i];
            const varying = this._varyings.get(name);

            varying.current = interpolableAdd(
                varying.current,
                varying.step
            );
        }
    }

    public get x(): number {
        return this._x;
    }

    public get y_start(): number {
        return this._y_start;
    }

    public get y_end(): number {
        return this._y_end;
    }

    public get from(): FragmentVertex {
        return this._from;
    }

    public get to(): FragmentVertex {
        return this._to;
    }

    public get varyings(): Map<string, EdgeInterpolation<InterpolableType>> {
        return this._varyings;
    }

    public get gradient(): VaryingInterpolator {
        return this._interpolator;
    }

}