import { AttributeType } from "../Vertex";
import { Color } from "./ColorUtils";
import { UintArray, TypedArray } from "./MathUtils";
import { Vec2 } from "./Vector/Vec2";
import { Vec3 } from "./Vector/Vec3";
import { vec3 } from "./Vector/VecShorthands";

interface AttributeArray {
    [key: string]: AttributeType[],
    uv?: Vec2[],
    normal?: Vec3[],
    color?: Color[]
}

export interface VertexData {
    vertices: Vec3[],
    indices?: UintArray,
    attributes?: AttributeArray,
    bounding_box?: BoundingBox
}

export interface FlatAttributeArrayInfo<T extends TypedArray> {
    stride: number,
    array: T
}

export interface FlatVec3ArrayInfo extends FlatAttributeArrayInfo<Float32Array> {
    stride: 3,
    array: Float32Array
}

interface FlatAttributeArray {
    [key: string]: FlatAttributeArrayInfo<TypedArray>,
    uv?: FlatVec3ArrayInfo,
    normal?: FlatVec3ArrayInfo,
    color?: FlatVec3ArrayInfo
}

export interface FlatVertexData {
    vertices: FlatVec3ArrayInfo,
    indices: UintArray,
    attributes?: FlatAttributeArray,
    bounding_box?: BoundingBox
}

export interface BoundingBox {
    min: Vec3,
    max: Vec3
}

export namespace ModelLoader {

    const parseVertex = (line: string): Vec3 => {
        // ex: "v 1.000000 -1.000000 -1.000000"
        const coords = line.substr(2).split(' ').map(x => parseFloat(x));
        return new Vec3(coords[0], 1 - coords[1], coords[2]);
    }

    const parseUV = (line: string): Vec2 => {
        // ex: vt 1.000000 0.000000
        const uvs = line.substr(3).split(' ').map(x => parseFloat(x));
        return new Vec2(uvs[0], uvs[1]);
    }

    const parseNormal = (line: string): Vec3 => {
        // ex: vn 0.000000 1.000000 0.000000
        const coords = line.substr(3).split(' ').map(x => parseFloat(x));
        return new Vec3(coords[0], coords[1], coords[2]);
    }

    export const parseOBJ = (obj_str: string): VertexData => {
        const lines = obj_str.split('\n');

        const vertices: Vec3[] = [];
        const uvs: Vec2[] = [];
        const normals: Vec3[] = [];
        const indices: number[] = [];

        const faces_cache = new Map<string, number>();

        let max_idx = 0;

        const mesh: VertexData = {
            vertices: [],
            indices: null,
            attributes: {
                uv: [],
                normal: []
            },
            bounding_box: {
                min: vec3(Infinity),
                max: vec3(0)
            }
        };

        for (let line of lines) {
            line = line.trim();
            switch (line.charAt(0)) {
                case 'v':
                    switch (line.charAt(1)) {
                        case ' ':
                            const v = parseVertex(line);
                            if (v.x > mesh.bounding_box.max.x) {
                                mesh.bounding_box.max.x = v.x;
                            }
                            if (v.y > mesh.bounding_box.max.y) {
                                mesh.bounding_box.max.y = v.y;
                            }
                            if (v.z > mesh.bounding_box.max.z) {
                                mesh.bounding_box.max.z = v.z;
                            }
                            if (v.x < mesh.bounding_box.min.x) {
                                mesh.bounding_box.min.x = v.x;
                            }
                            if (v.y < mesh.bounding_box.min.y) {
                                mesh.bounding_box.min.y = v.y;
                            }
                            if (v.z < mesh.bounding_box.min.z) {
                                mesh.bounding_box.min.z = v.z;
                            }
                            vertices.push(v);
                            break;

                        case 't':
                            uvs.push(parseUV(line));
                            break;

                        case 'n':
                            normals.push(parseNormal(line));
                            break;
                    }
                    break;

                case 'f':
                    // ex: f 1/1/1 2/2/1 3/3/1 4/4/1
                    const faces = line.substr(2).split(' ');
                    let face_indices = [];

                    for (const face of faces) {
                        if (faces_cache.has(face)) {
                            face_indices.push(faces_cache.get(face));
                            continue;
                        }

                        const [vert_idx, uv_idx, normal_idx] = face.split('/').map(x => parseInt(x) - 1);

                        mesh.vertices.push(vertices[vert_idx]);
                        if (uv_idx !== undefined) mesh.attributes.uv.push(uvs[uv_idx]);
                        if (normal_idx !== undefined) mesh.attributes.normal.push(normals[normal_idx]);

                        faces_cache.set(face, max_idx);
                        face_indices.push(max_idx);
                        max_idx++;
                    }

                    // triangulate the quad
                    if (faces.length === 4) {
                        const fourth = face_indices[3];
                        face_indices[3] = face_indices[2];
                        face_indices[4] = fourth;
                        face_indices[5] = face_indices[0];
                    }

                    indices.push(...face_indices);
                    break;
            }
        }

        mesh.indices = max_idx < 256 ? new Uint8Array(indices) :
            max_idx < 65536 ? new Uint16Array(indices) : new Uint32Array(indices);

        return mesh;
    }

    // export const load = (source: string): Promise<VertexData> => {
    //     return new Promise<VertexData>(async (resolve, reject) => {
    //         try {
    //             const data = await (await fetch(source)).text();
    //             const model = parseOBJ(data);
    //             resolve(model);
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    // }

}