export class Clock {
    constructor() {
        this.last_tick = Date.now();
    }
    getDelta() {
        const now = Date.now();
        const delta = now - this.last_tick;
        this.last_tick = now;
        return delta;
    }
}
