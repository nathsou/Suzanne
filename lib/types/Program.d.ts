import { VertexShader, FragmentShader } from "./Shader";
export interface Program {
    vertex_shader: VertexShader;
    fragment_shader: FragmentShader;
}
