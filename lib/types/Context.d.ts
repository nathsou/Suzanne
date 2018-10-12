import { Bitmap } from "./Bitmap";
import { Program } from "./Program";
import { VertexArray } from "./VertexArray";
export declare enum DrawingMode {
    POINTS = 0,
    LINES = 1,
    TRIANGLES = 2
}
export interface ContextOptions {
    depth_test: boolean;
    backface_culling: boolean;
}
export interface RenderingTarget {
    init?(width: number, height: number): void;
    draw(bitmap: Bitmap): void;
}
export declare class Context extends Bitmap {
    private _target;
    private _screen_space_matrix;
    private _vertex_array;
    private _current_gradient;
    private _current_varyings;
    private _current_varying_names;
    private _program;
    private _options;
    private _depth_buffer;
    constructor(width: number, height: number, target: RenderingTarget, options?: Partial<ContextOptions>);
    private _initOptions;
    private _perspectiveTransform;
    private _shouldDrawFragment;
    private _scanLine;
    private _initVaryings;
    private _strokeEdge;
    private _drawLines;
    private _drawLinesIndexed;
    private _drawTriangles;
    private _drawTrianglesIndexed;
    private _strokeTriangle;
    private _fillTriangle;
    private _scanEdges;
    drawArrays(mode: DrawingMode, first: number, count: number, stroke?: boolean): void;
    drawElements(mode: DrawingMode, first: number, count: number, stroke?: boolean): void;
    useProgram(prog: Program): void;
    bindVertexArray(VAO: VertexArray): void;
    private _clearDepthBuffer;
    clearBuffers(): void;
    draw(): void;
    readonly options: ContextOptions;
}
