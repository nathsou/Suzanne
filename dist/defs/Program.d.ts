import { VertexShader, FragmentShader } from "../src/Shader";
export interface Program {
    vertex_shader: VertexShader;
    fragment_shader: FragmentShader;
}
