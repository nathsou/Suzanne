
# Suzanne 🐒 - Dependency-free 3D Software Renderer

![Wooden Suzanne](res/wooden_suzanne.png)

## Features 🐵

    - Programmable Vertex and Fragment shaders
    - Perspective correct varying interpolation
    - Texture mapping
    - OBJ model loader
    - API similar to WebGL
    - Works in the browser and node.js
    - Provides TypeScript type declarations

## Use cases 🙈

    - Server-side 3D rendering
    - Set your CPU on 🔥

## Todo 🙊

    - Implement clipping
    - Support .mtl files
    - Improve performance
    - Antialiasing

# Usage 🍌

```bash
npm install suzanne
```

## Importing

### Node.js

```javascript
const suz = require('suzanne');
```

### Browser

```html
<script src='./node_modules/suzanne/dist/suzanne.js'></script>
```

### Basic example

To draw something, a new Context must be created

Suzanne internally stores pixel data in a Uint8ClampedArray in RGBA

```javascript
const sz = new suz.Context(400, 300, {
        draw: bitmap => {
        // draw bitmap (to a file or in an html canvas)
    }
});

const triangle = {
    vertices: [
        suz.vec3(-1, -1, 2),
        suz.vec3(1, -1, 2),
        suz.vec3(0, 1, 2)
    ],
    indices: new Uint8Array([0, 1, 2]),
    attributes: {
        color: [ //suz.colors are just suz.vec4 instances
            suz.colors.red,
            suz.colors.green,
            suz.colors.blue
        ]
    }
};

// create a Vertex Array Object from our triangle
const VAO = suz.VertexArray.fromModel(triangle);

// Use a perspective projection matrix to transform the triangle's vertices
const proj = suz.Matrix4.perspective(suz.radians(70), sz.width / sz.height, 0.1, 1000);

// declare a uniform variable (accessible from both shaders)
VAO.setUniform('mvp', proj);

// Attach shaders to our Canvas3D
sz.useProgram({
    vertex_shader: vertex => {
        // interpolate the color attribute
        vertex.varyings.color = vertex.attributes.color;

        // return our transformed vertex's position
        return vertex.uniforms.mvp.transform(vertex.position);
    },
    fragment_shader: (varyings, uniforms) => {
        return varyings.color;
    }
});

// bind our VAO to our Canvas3D
sz.bindVertexArray(VAO);

// clear the canvas to black
sz.clear(suz.colors.black);

// draw the triangle in indexed mode
sz.drawElements(suz.DrawingMode.TRIANGLES, 0, triangle.indices.length, 0);

// update the canvas
sz.draw();
```

### Result - A magnificent colored triangle 🔻

![Colored triangle](res/tri.png)