import { Color } from "./Utils/ColorUtils";
import { VaryingList, Vertex, UniformList } from "./Vertex";
import { Vec4 } from "./Utils/Vector/Vec4";
export declare type VertexShader = (vertex: Vertex) => Vec4;
export declare type FragmentShader = (varyings: Readonly<VaryingList>, uniforms: Readonly<UniformList>) => Color;
