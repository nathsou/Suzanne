"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bitmap_1 = require("./Bitmap");
const Edge_1 = require("./Edge");
const MathUtils_1 = require("./Utils/MathUtils");
const Matrix4_1 = require("./Utils/Matrix4");
const Vec4_1 = require("./Utils/Vector/Vec4");
const VaryingInterpolator2_1 = require("./VaryingInterpolator/VaryingInterpolator2");
const VaryingInterpolator3_1 = require("./VaryingInterpolator/VaryingInterpolator3");
var DrawingMode;
(function (DrawingMode) {
    DrawingMode[DrawingMode["POINTS"] = 0] = "POINTS";
    DrawingMode[DrawingMode["LINES"] = 1] = "LINES";
    DrawingMode[DrawingMode["TRIANGLES"] = 2] = "TRIANGLES";
})(DrawingMode = exports.DrawingMode || (exports.DrawingMode = {}));
class Context extends Bitmap_1.Bitmap {
    constructor(width, height, target, options) {
        super(width, height);
        this._target = target;
        this._initOptions(options);
        this._screen_space_matrix = Matrix4_1.Matrix4.screenSpace(width, height);
    }
    initDepthBuffer() {
        if (this._options.depth_test) {
            this._depth_buffer = new Float32Array(this._width * this._height);
            this._depth_buffer.fill(Infinity);
        }
    }
    _initOptions(optns = {}) {
        this._options = Object.assign({ depth_test: true, backface_culling: true }, optns);
        if (this._target.init !== undefined) {
            this._target.init(this._width, this._height);
        }
        this.initDepthBuffer();
    }
    _perspectiveTransform(u) {
        const res = this._program.vertex_shader(u);
        //convert from ndc to screen space
        const v = this._screen_space_matrix.transform(res);
        const pos = new Vec4_1.Vec4(v.x / v.w, v.y / v.w, v.z / v.w, 1 / v.w);
        // interpolate the position for z-buffering
        u.varyings.__ndc = pos;
        return {
            ndc: pos,
            varyings: u.varyings,
            index: u.index
        };
    }
    _shouldDrawFragment(x, y, depth) {
        // if (x < 0 || x > this._image.width || y < 0 || y > this._image.height) {
        //     return false;
        // }
        // don't override hidden fragments
        if (this._options.depth_test) {
            const idx = x + y * this._width;
            if (depth > this._depth_buffer[idx])
                return false;
            this._depth_buffer[idx] = depth;
        }
        return true;
    }
    // _current_gradients must be set before calling _scanLine
    _scanLine(y, left, right) {
        y = Math.ceil(y);
        const x_min = Math.ceil(left.x);
        const x_max = Math.ceil(right.x);
        const x_offset = x_min - left.x;
        this._initVaryings(left, x_offset);
        this._current_varyings = {};
        const ndc = this._current_gradient.varyings.get('__ndc');
        let z;
        for (let x = x_min; x < x_max; x++) {
            // interpolate each varying with perspective correction
            this._current_gradient.stepX(ndc);
            z = 1 / ndc.current.w;
            for (const name of this._vertex_array.varyingNames) {
                if (name === '__ndc')
                    continue;
                const varying = this._current_gradient.varyings.get(name);
                // this._current_varyings[name] = interpolableAddTimes(v.current, v.x_step, z);
                this._current_varyings[name] = MathUtils_1.interpolableTimes(this._current_gradient.stepX(varying), z);
            }
            if (!this._shouldDrawFragment(x, y, ndc.current.z))
                continue;
            this._set(x, y, this._program.fragment_shader(this._current_varyings, this._vertex_array.uniforms));
        }
    }
    _initVaryings(left, x_offset) {
        // init all varyings to their interpolated value on the left edge
        for (const name of this._vertex_array.varyingNames) {
            const varying = this._current_gradient.varyings.get(name);
            // take the ceiling difference into account
            varying.current = MathUtils_1.interpolableAdd(left.varyings.get(name).current, MathUtils_1.interpolableTimes(varying.x_step, x_offset));
        }
    }
    _strokeEdge(edge) {
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
        const varyings = {};
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
                eps -= dy;
                x += sx;
            }
            if (e2 < dx) {
                eps += dx;
                y += sy;
            }
        }
    }
    _drawLines(first, count) {
        for (let i = first; i < first + count; i += 2) {
            const a = this._perspectiveTransform(this._vertex_array.at(i));
            const b = this._perspectiveTransform(this._vertex_array.at(i + 1));
            this._strokeEdge(new Edge_1.Edge(a, b, new VaryingInterpolator2_1.VaryingInterpolator2(a, b, this._vertex_array)));
        }
    }
    _drawLinesIndexed(first, count) {
        const indices = this._vertex_array.indices;
        for (let i = first; i < first + count; i += 2) {
            const a = this._perspectiveTransform(this._vertex_array.at(indices[i]));
            const b = this._perspectiveTransform(this._vertex_array.at(indices[i + 1]));
            this._strokeEdge(new Edge_1.Edge(a, b, new VaryingInterpolator2_1.VaryingInterpolator2(a, b, this._vertex_array)));
        }
    }
    _drawTriangles(first, count, stroke) {
        for (let i = first; i < first + count; i += 3) {
            const a = this._perspectiveTransform(this._vertex_array.at(i));
            const b = this._perspectiveTransform(this._vertex_array.at(i + 1));
            const c = this._perspectiveTransform(this._vertex_array.at(i + 2));
            if (stroke) {
                this._strokeTriangle(a, b, c);
            }
            else {
                this._fillTriangle(a, b, c);
            }
        }
    }
    _drawTrianglesIndexed(first, count, stroke) {
        const indices = this._vertex_array.indices;
        for (let i = first + count - 1; i >= 0; i -= 3) {
            const a = this._perspectiveTransform(this._vertex_array.at(indices[i - 2]));
            const b = this._perspectiveTransform(this._vertex_array.at(indices[i - 1]));
            const c = this._perspectiveTransform(this._vertex_array.at(indices[i]));
            if (stroke) {
                this._strokeTriangle(a, b, c);
            }
            else {
                this._fillTriangle(a, b, c);
            }
        }
    }
    _strokeTriangle(a, b, c) {
        this._strokeEdge(new Edge_1.Edge(a, b, new VaryingInterpolator2_1.VaryingInterpolator2(a, b, this._vertex_array)));
        this._strokeEdge(new Edge_1.Edge(a, c, new VaryingInterpolator2_1.VaryingInterpolator2(a, c, this._vertex_array)));
        this._strokeEdge(new Edge_1.Edge(b, c, new VaryingInterpolator2_1.VaryingInterpolator2(b, c, this._vertex_array)));
    }
    _fillTriangle(a, b, c) {
        // backface culling
        if (this._options.backface_culling && MathUtils_1.parallelogramArea(a.ndc, b.ndc, c.ndc) < 0) {
            return;
        }
        let invert = false;
        // sort vertices by y coordinate (bubble sort)
        if (c.ndc.y < b.ndc.y) {
            [c, b] = [b, c];
            invert = !invert;
        }
        if (b.ndc.y < a.ndc.y) {
            [b, a] = [a, b];
            invert = !invert;
        }
        if (c.ndc.y < b.ndc.y) {
            [c, b] = [b, c];
            invert = !invert;
        }
        const gradient = new VaryingInterpolator3_1.VaryingInterpolator3(a, b, c, this._vertex_array);
        this._current_gradient = gradient;
        const long = new Edge_1.Edge(a, c, gradient);
        this._scanEdges(long, new Edge_1.Edge(a, b, gradient), invert);
        this._scanEdges(long, new Edge_1.Edge(b, c, gradient), invert);
    }
    _scanEdges(long, short, invert) {
        let left = long;
        let right = short;
        const y_start = short.y_start;
        const y_end = short.y_end;
        if (invert)
            [left, right] = [right, left];
        for (let y = y_start; y < y_end; y++) {
            this._scanLine(y, left, right);
            left.step();
            right.step();
        }
    }
    drawArrays(mode, first, count, stroke = false) {
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
    drawElements(mode, first, count, stroke = false) {
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
    useProgram(prog) {
        this._program = prog;
    }
    bindVertexArray(VAO) {
        this._vertex_array = VAO;
    }
    _clearDepthBuffer() {
        if (this._options.depth_test) {
            this._depth_buffer.fill(Infinity);
        }
    }
    clearBuffers() {
        this._clearDepthBuffer();
    }
    draw() {
        this._target.draw(this);
    }
    get options() {
        return this._options;
    }
    resize(width, height) {
        super.resize(width, height);
        this.initDepthBuffer();
        this._screen_space_matrix = Matrix4_1.Matrix4.screenSpace(width, height);
        if (this._target.resize !== undefined) {
            this._target.resize(width, height);
        }
    }
}
exports.Context = Context;
