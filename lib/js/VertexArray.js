export class VertexArray {
    constructor(vertices) {
        this._vertices = vertices;
        this._attributes = new Map();
        this._varyings = new Map();
        this._uniforms = {};
        this._current_idx = 0;
        this._attribute_accessor = new Proxy({}, {
            get: (_, prop) => {
                const val = this._attributes.get(prop)[this._current_idx];
                if (val === undefined) {
                    throw new Error(`Undefined attribute: ${prop}`);
                }
                return val;
            }
        });
        this._varying_setter = new Proxy({}, {
            set: (obj, prop, val) => {
                const prop_varyings = this._varyings.get(prop);
                if (prop_varyings === undefined) {
                    const array = [];
                    array[this._current_idx] = val;
                    this._varyings.set(prop, array);
                }
                else {
                    prop_varyings[this._current_idx] = val;
                }
                obj[prop] = val;
                return true;
            }
        });
    }
    at(idx) {
        this._current_idx = idx;
        return {
            position: this._vertices[idx],
            attributes: this._attribute_accessor,
            uniforms: this._uniforms,
            varyings: this._varying_setter,
            index: idx
        };
    }
    addAttribute(name, values) {
        if (values.length < this._vertices.length) {
            throw new Error(`Not enough data for attribute ${name}`);
        }
        this._attributes.set(name, values);
    }
    setUniform(name, value) {
        this._uniforms[name] = value;
    }
    indexed() {
        return this._indices !== undefined;
    }
    get indices() {
        return this._indices;
    }
    set indices(indices) {
        this._indices = indices;
    }
    get varyings() {
        return this._varyings;
    }
    get uniforms() {
        return this._uniforms;
    }
    static fromModel(model) {
        const VAO = new VertexArray(model.vertices);
        if (model.indices !== undefined) {
            VAO.indices = model.indices;
        }
        for (const attrib_name in model.attributes) {
            const attribute = model.attributes[attrib_name];
            if (attribute !== undefined && attribute.length !== 0) {
                VAO.addAttribute(attrib_name, attribute);
            }
        }
        return VAO;
    }
}
