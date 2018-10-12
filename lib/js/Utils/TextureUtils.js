export const texture = (tex, uv) => tex.at(Math.floor(uv.x * tex.width), Math.floor(uv.y * tex.height));
