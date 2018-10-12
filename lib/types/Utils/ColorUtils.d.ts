import { Vec4 } from "./Vector/Vec4";
export declare type Color = Vec4;
export declare type CSSColor = string;
export declare type CSSColorConverter = (style: CSSColor) => Color;
export declare function hexToColor(hex: number): Color;
export declare const colors: {
    transparent: Vec4;
    black: Vec4;
    white: Vec4;
    red: Vec4;
    green: Vec4;
    blue: Vec4;
    yellow: Vec4;
    cyan: Vec4;
    pink: Vec4;
    orange: Vec4;
    rand: () => Vec4;
    css: CSSColorConverter;
};
