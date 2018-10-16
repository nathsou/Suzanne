import { Bitmap } from "./Bitmap";
import { Edge } from "./Edge";
import { Program } from "./Program";
import { interpolableAdd, interpolableTimes, parallelogramArea } from "./Utils/MathUtils";
import { Matrix4 } from "./Utils/Matrix4";
import { Vec4 } from "./Utils/Vector/Vec4";
import { VaryingInterpolator } from "./VaryingInterpolator/VaryingInterpolator";
import { VaryingInterpolator2 } from "./VaryingInterpolator/VaryingInterpolator2";
import { VaryingInterpolator3 } from "./VaryingInterpolator/VaryingInterpolator3";
import { FragmentVertex, VaryingList, Vertex } from "./Vertex";
import { VertexArray } from "./VertexArray";

export enum DrawingMode {
    POINTS,
    LINES,
    TRIANGLES
}

export interface ContextOptions {
    depth_test: boolean,
    backface_culling: boolean
}

export interface RenderingTarget {
    init?(width: number, height: number): void;
    resize?(width: number, height: number): void;
    draw(bitmap: Bitmap): void;
}

export class Context extends Bitmap {

    private _target: RenderingTarget;
    private _screen_space_matrix: Matrix4;
    private _vertex_array: VertexArray;
    private _current_gradient: VaryingInterpolator;
    private _current_varyings: VaryingList;
    private _program: Program;
    private _options: ContextOptions;
    private _depth_buffer: Float32Array;

    constructor(width: number, height: number, target: RenderingTarget, options?: Partial<ContextOptions>) {
        super(width, height);
        this._target = target;
        this._initOptions(options);
        this._screen_space_matrix = Matrix4.screenSpace(width, height);
    }

    private initDepthBuffer(): void {
        if (this._options.depth_test) {
            this._depth_buffer = new Float32Array(this._width * this._height);
            this._depth_buffer.fill(Infinity);
        }
    }

    private _initOptions(optns: Partial<ContextOptions> = {}): void {
        this._options = {
            depth_test: true,
            backface_culling: true,
            ...optns
        };

        if (this._target.init !== undefined) {
            this._target.init(this._width, this._height);
        }

        this.initDepthBuffer();
    }

    private _perspectiveTransform(u: Vertex): FragmentVertex {

        const res = this._program.vertex_shader(u);
        //convert from ndc to screen space
        const v = this._screen_space_matrix.transform(res);

        const pos = new Vec4(v.x / v.w, v.y / v.w, v.z / v.w, 1 / v.w);

        // interpolate the position for z-buffering
        u.varyings.__ndc = pos;

        return {
            ndc: pos,
            varyings: u.varyings,
            index: u.index
        };
    }

    private _shouldDrawFragment(x: number, y: number, depth: number): boolean {

        // if (x < 0 || x > this._image.width || y < 0 || y > this._image.height) {
        //     return false;
        // }

        // don't override hidden fragments
        if (this._options.depth_test) {
            const idx = x + y * this._width;
            if (depth > this._depth_buffer[idx]) return false;

            this._depth_buffer[idx] = depth;
        }

        return true;
    }


    // _current_gradients must be set before calling _scanLine
    private _scanLine(
        y: number,
        left: Edge,
        right: Edge
    ): void {
        y = Math.ceil(y);
        const x_min = Math.ceil(left.x);
        const x_max = Math.ceil(right.x);

        const x_offset = x_min - left.x;

        this._initVaryings(left, x_offset);

        this._current_varyings = {};
        const ndc = this._current_gradient.varyings.get('__ndc');
        let z: number;

        for (let x = x_min; x < x_max; x++) {
            // interpolate each varying with perspective correction
            this._current_gradient.stepX(ndc);
            z = 1 / (ndc.current as Vec4).w;

            for (const name of this._vertex_array.varyingNames) {
                if (name === '__ndc') continue;
                const varying = this._current_gradient.varyings.get(name);
                // this._current_varyings[name] = interpolableAddTimes(v.current, v.x_step, z);

                this._current_varyings[name] = interpolableTimes(
                    this._current_gradient.stepX(varying),
                    z
                );
            }

            if (!this._shouldDrawFragment(x, y, (ndc.current as Vec4).z)) continue;

            this._set(
                x,
                y,
                this._program.fragment_shader(this._current_varyings, this._vertex_array.uniforms)
            );
        }
    }

    private _initVaryings(left: Edge, x_offset: number): void {
        // init all varyings to their interpolated value on the left edge
        for (const name of this._vertex_array.varyingNames) {
            const varying = this._current_gradient.varyings.get(name);

            // take the ceiling difference into account
            varying.current = interpolableAdd(
                left.varyings.get(name).current,
                interpolableTimes(varying.x_step, x_offset)
            );
        }
    }

    private _strokeEdge(edge: Edge): void {

        const from = edge.from;
        const to = edge.to;

        const x0 = Math.ceil(from.ndc.x);
        const y0 = Math.ceil(from.ndc.y);
        const x1 = Math.ceil(to.ndc.x);
        const y1 = Math.ceil(to.ndc.y);
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let eps = dx - dy;

        this._current_gradient = edge.gradient;
        const x_offset = x0 - from.ndc.x;

        this._initVaryings(edge, x_offset);

        let x = x0;
        let y = y0;

        const varyings: VaryingList = {};

        while (x !== x1 || y !== y1) {
            // interpolate each varying
            for (const [name, varying] of this._current_gradient.varyings) {
                this._current_gradient.stepX(varying);
                varyings[name] = varying.current;
            }

            // if (this._shouldDrawFragment(x, y)) {
            //     this._set(x, y, this._program.fragment_shader(varyings));
            // }

            const e2 = 2 * eps;
            if (e2 > -dy) {
                eps -= dy; x += sx;
            }

            if (e2 < dx) {
                eps += dx; y += sy;
            }
        }
    }


    private _drawLines(first: number, count: number): void {

        for (let i = first; i < first + count; i += 2) {
            const a = this._perspectiveTransform(this._vertex_array.at(i));
            const b = this._perspectiveTransform(this._vertex_array.at(i + 1));
            this._strokeEdge(new Edge(a, b, new VaryingInterpolator2(a, b, this._vertex_array)));
        }
    }

    private _drawLinesIndexed(first: number, count: number): void {
        const indices = this._vertex_array.indices;

        for (let i = first; i < first + count; i += 2) {
            const a = this._perspectiveTransform(this._vertex_array.at(indices[i]));
            const b = this._perspectiveTransform(this._vertex_array.at(indices[i + 1]));
            this._strokeEdge(new Edge(a, b, new VaryingInterpolator2(a, b, this._vertex_array)));
        }
    }

    private _drawTriangles(first: number, count: number, stroke: boolean): void {

        for (let i = first; i < first + count; i += 3) {
            const a = this._perspectiveTransform(this._vertex_array.at(i));
            const b = this._perspectiveTransform(this._vertex_array.at(i + 1));
            const c = this._perspectiveTransform(this._vertex_array.at(i + 2));
            if (stroke) {
                this._strokeTriangle(a, b, c);
            } else {
                this._fillTriangle(a, b, c);
            }
        }
    }

    private _drawTrianglesIndexed(first: number, count: number, stroke: boolean): void {
        const indices = this._vertex_array.indices;

        for (let i = first + count - 1; i >= 0; i -= 3) {
            const a = this._perspectiveTransform(this._vertex_array.at(indices[i - 2]));
            const b = this._perspectiveTransform(this._vertex_array.at(indices[i - 1]));
            const c = this._perspectiveTransform(this._vertex_array.at(indices[i]));
            if (stroke) {
                this._strokeTriangle(a, b, c);
            } else {
                this._fillTriangle(a, b, c);
            }
        }
    }

    private _strokeTriangle(a: FragmentVertex, b: FragmentVertex, c: FragmentVertex): void {
        this._strokeEdge(new Edge(a, b, new VaryingInterpolator2(a, b, this._vertex_array)));
        this._strokeEdge(new Edge(a, c, new VaryingInterpolator2(a, c, this._vertex_array)));
        this._strokeEdge(new Edge(b, c, new VaryingInterpolator2(b, c, this._vertex_array)));
    }

    private _fillTriangle(a: FragmentVertex, b: FragmentVertex, c: FragmentVertex): void {

        // backface culling
        if (this._options.backface_culling && parallelogramArea(a.ndc, b.ndc, c.ndc) < 0) {
            return;
        }

        let invert = false;

        // sort vertices by y coordinate (bubble sort)
        if (c.ndc.y < b.ndc.y) { [c, b] = [b, c]; invert = !invert; }
        if (b.ndc.y < a.ndc.y) { [b, a] = [a, b]; invert = !invert; }
        if (c.ndc.y < b.ndc.y) { [c, b] = [b, c]; invert = !invert; }

        const gradient = new VaryingInterpolator3(a, b, c, this._vertex_array);
        this._current_gradient = gradient;

        const long = new Edge(a, c, gradient);

        this._scanEdges(long, new Edge(a, b, gradient), invert);
        this._scanEdges(long, new Edge(b, c, gradient), invert);
    }

    private _scanEdges(long: Edge, short: Edge, invert: boolean): void {

        let left = long;
        let right = short;

        const y_start = short.y_start;
        const y_end = short.y_end;

        if (invert) [left, right] = [right, left];

        for (let y = y_start; y < y_end; y++) {
            this._scanLine(y, left, right);
            left.step();
            right.step();
        }

    }

    public drawArrays(mode: DrawingMode, first: number, count: number, stroke = false): void {
        switch (mode) {
            case DrawingMode.LINES:
                this._drawLines(first, count);
                break;

            case DrawingMode.TRIANGLES:
                this._drawTriangles(first, count, stroke);
                break;

            default:
                throw new Error(`Drawing mode ${mode} not implemented yet`);
        }

        this.draw();
    }

    public drawElements(mode: DrawingMode, first: number, count: number, stroke = false): void {

        if (!this._vertex_array.indexed) {
            throw new Error('Cannot draw elements: indices not defined in bound vertex array');
        }

        switch (mode) {
            case DrawingMode.LINES:
                this._drawLinesIndexed(first, count);
                break;

            case DrawingMode.TRIANGLES:
                this._drawTrianglesIndexed(first, count, stroke);
                break;

            default:
                throw new Error(`Drawing mode ${mode} not implemented yet`);
        }

        this.draw();
    }

    public useProgram(prog: Program): void {
        this._program = prog;
    }

    public bindVertexArray(VAO: VertexArray): void {
        this._vertex_array = VAO;
    }

    private _clearDepthBuffer(): void {
        if (this._options.depth_test) {
            this._depth_buffer.fill(Infinity);
        }
    }

    public clearBuffers(): void {
        this._clearDepthBuffer();
    }

    public draw(): void {
        this._target.draw(this);
    }

    public get options(): ContextOptions {
        return this._options;
    }

    public resize(width: number, height: number): void {
        super.resize(width, height);
        this.initDepthBuffer();
        this._screen_space_matrix = Matrix4.screenSpace(width, height);
        if (this._target.resize !== undefined) {
            this._target.resize(width, height);
        }
    }

}