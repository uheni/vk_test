class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(eventName, listener) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(listener);
    }

    emit(eventName, ...args) {
        const listeners = this.events.get(eventName);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }

    off(eventName, listener) {
        const listeners = this.events.get(eventName);
        if (listeners) {
            this.events.set(
                eventName,
                listeners.filter(l => l !== listener)
            );
        }
    }
}