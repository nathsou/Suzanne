export const degrees = (angle_radians) => {
    return (angle_radians * 57.29577951308232) % 360;
};
export const radians = (angle_degrees) => {
    return (angle_degrees * 0.017453292519943295) % 6.283185307179586;
};
export const clamp = (x, min, max) => {
    return Math.max(Math.min(x, max), min);
};
export function parallelogramArea(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}
export function interpolableAdd(a, b) {
    if (typeof a === 'number') {
        return (a + b);
    }
    else {
        return a.add(b);
    }
}
export function interpolableTimes(a, k) {
    if (typeof a === 'number') {
        return (a * k);
    }
    else {
        return a.times(k);
    }
}
export function interpolableMul(a, b) {
    if (typeof a === 'number') {
        return (a * b);
    }
    else {
        return a.mul(b);
    }
}
export function interpolableAddTimes(a, b, k) {
    if (typeof a === 'number') {
        return ((a + b * k));
    }
    else {
        return a.addTimes(b, k);
    }
}
/**
 * Fill a TypedArray with a sequence of elements in O(log(dest.length)) time
 *
 * @export
 * @template T
 * @param {T} dest the destination TypedArray
 * @param {ArrayLike<number>} seq the sequence to repeat
 * @returns {T} the mutated dest TypedArray
 */
export function fillSequence(dest, seq) {
    dest.set(seq);
    const dest_len = dest.length;
    let offset = seq.length;
    while (offset < dest_len) {
        dest.copyWithin(offset, 0, offset);
        offset <<= 1;
    }
    return dest;
}
