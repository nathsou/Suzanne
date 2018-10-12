import { VertexData } from "./Utils/ModelLoader";
import { Vec3 } from "./Utils/Vector/Vec3";
import { InterpolableType } from "./VaryingInterpolator/VaryingInterpolator";
import { AttributeType, UniformList, UniformType, VaryingList, Vertex } from "./Vertex";
import { UintArray } from "./Utils/MathUtils";
export declare class VertexArray {
    private _vertices;
    private _indices;
    private _attributes;
    private _varyings;
    private _uniforms;
    private _attribute_accessor;
    private _varying_setter;
    private _current_idx;
    constructor(vertices: Vec3[]);
    at(idx: number): Vertex;
    addAttribute(name: string, values: AttributeType[]): void;
    setUniform(name: string, value: UniformType): void;
    indexed(): boolean;
    indices: UintArray;
    readonly varyings: Map<keyof VaryingList, InterpolableType[]>;
    readonly uniforms: Readonly<UniformList>;
    static fromModel(model: VertexData): VertexArray;
}
