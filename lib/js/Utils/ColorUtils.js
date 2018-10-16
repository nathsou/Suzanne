"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec4_1 = require("./Vector/Vec4");
function createCSSColorConverter(max_history = 100) {
    const cnv = document.createElement('canvas');
    cnv.width = 1;
    cnv.height = 1;
    const ctx = cnv.getContext('2d');
    const history = new Map();
    return (style) => {
        if (history.has(style))
            return history.get(style);
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, 1, 1);
        ctx.fill();
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        const color = new Vec4_1.Vec4(r / 255, g / 255, b / 255, a / 255);
        if (history.size === max_history) {
            history.delete(history.keys().next().value);
        }
        history.set(style, color);
        return color;
    };
}
function hexToColor(hex) {
    return new Vec4_1.Vec4(((hex >> 16) & 0xff) / 0xff, ((hex >> 8) & 0xff) / 0xff, (hex & 0xff) / 0xff, 1);
}
exports.hexToColor = hexToColor;
exports.colors = {
    transparent: new Vec4_1.Vec4(0, 0, 0, 0),
    black: hexToColor(0x000000),
    white: hexToColor(0xffffff),
    red: hexToColor(0xff0000),
    green: hexToColor(0x00ff00),
    blue: hexToColor(0x0000ff),
    yellow: hexToColor(0xffff00),
    cyan: hexToColor(0x00ffff),
    pink: hexToColor(0xff00ff),
    orange: hexToColor(0xff8c00),
    rand: () => hexToColor(Math.floor(Math.random() * 0x1000000)),
    css: undefined
};
if (typeof window !== 'undefined') {
    exports.colors.css = createCSSColorConverter();
}
