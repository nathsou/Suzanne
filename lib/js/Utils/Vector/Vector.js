"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VecShorthands_1 = require("./VecShorthands");
exports.EPS = Math.pow(10, -6);
function swizzling_trap(v, prop) {
    if (typeof prop !== 'string')
        return undefined;
    ///@ts-ignore
    const default_get = v[prop];
    if (default_get instanceof Function) {
        return default_get;
    }
    const chars = prop.split('');
    if (prop.length > 1 && prop.length < 5) { // && chars.every(char => 'xyzrgba'.includes(char))) { // && /[xyzwrgba]{1,4}/.test(prop)) {
        ///@ts-ignore
        const r = chars.map(char => v[char]);
        return r.length === 1 ? r[0] : VecShorthands_1.vec(...r);
    }
    ///@ts-ignore
    return default_get;
}
;
function swizzle(v, sizzling_str) {
    if (sizzling_str !== undefined) {
        return swizzling_trap(v, sizzling_str);
    }
    return new Proxy(v, { get: swizzling_trap });
}
exports.swizzle = swizzle;
