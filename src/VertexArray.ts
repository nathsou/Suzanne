import { VertexData } from "./Utils/ModelLoader";
import { Vec3 } from "./Utils/Vector/Vec3";
import { InterpolableType } from "./VaryingInterpolator/VaryingInterpolator";
import { AttributeList, AttributeType, UniformList, UniformType, VaryingList, Vertex } from "./Vertex";
import { UintArray } from "./Utils/MathUtils";

export class VertexArray {

    private _vertices: Vec3[];
    private _indices: UintArray;
    private _attributes: Map<keyof AttributeList, AttributeType[]>;
    private _varyings: Map<keyof VaryingList, InterpolableType[]>
    private _uniforms: UniformList;
    private _attribute_accessor: Readonly<AttributeList>;
    private _varying_setter: VaryingList;
    private _current_idx: number;

    constructor(vertices: Vec3[]) {
        this._vertices = vertices;
        this._attributes = new Map<keyof AttributeList, AttributeType[]>();
        this._varyings = new Map<keyof VaryingList, InterpolableType[]>();
        this._uniforms = {};
        this._current_idx = 0;

        this._attribute_accessor = new Proxy({}, {
            get: (_, prop: keyof VaryingList) => {
                const val = this._attributes.get(prop as string)[this._current_idx];
                if (val === undefined) {
                    throw new Error(`Undefined attribute: ${prop}`);
                }

                return val;
            }
        });

        this._varying_setter = new Proxy({}, {
            set: (obj: VaryingList, prop: keyof VaryingList, val: InterpolableType) => {

                const prop_varyings = this._varyings.get(prop);

                if (prop_varyings === undefined) {
                    const array: InterpolableType[] = [];
                    array[this._current_idx] = val;
                    this._varyings.set(prop, array);
                } else {
                    prop_varyings[this._current_idx] = val;
                }

                obj[prop] = val;

                return true;
            }
        });
    }

    public at(idx: number): Vertex {

        this._current_idx = idx;

        return {
            position: this._vertices[idx],
            attributes: this._attribute_accessor,
            uniforms: this._uniforms,
            varyings: this._varying_setter,
            index: idx
        };
    }

    public addAttribute(name: string, values: AttributeType[]): void {
        if (values.length < this._vertices.length) {
            throw new Error(`Not enough data for attribute ${name}`);
        }

        this._attributes.set(name, values);
    }

    public setUniform(name: string, value: UniformType): void {
        this._uniforms[name] = value;
    }

    public indexed(): boolean {
        return this._indices !== undefined;
    }

    public get indices(): UintArray {
        return this._indices;
    }

    public set indices(indices: UintArray) {
        this._indices = indices;
    }

    public get varyings(): Map<keyof VaryingList, InterpolableType[]> {
        return this._varyings;
    }

    public get uniforms(): Readonly<UniformList> {
        return this._uniforms;
    }

    public static fromModel(model: VertexData): VertexArray {
        const VAO = new VertexArray(model.vertices);
        VAO.indices = model.indices;

        for (const attrib_name in model.attributes) {
            const attribute = model.attributes[attrib_name];
            if (attribute !== undefined && attribute.length !== 0) {
                VAO.addAttribute(attrib_name, attribute);
            }
        }

        return VAO;
    }

}