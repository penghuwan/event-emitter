
function EventEmitter() {
    this.listeners = {};
    this.maxListener = 11;
}

EventEmitter.prototype.on = function (event, cb) {
    // 是否需要通过this访问
    if (listeners[event].length >= this.maxListener) {
        throw new Error('监听器的最大数量是%d,您已超出限制', this.maxListener)
    }
    if (listeners[event] instanceof Array) {
        if (!listeners[event].indexOf(cb)) {
            listeners[event].push(cb);
        }
    } else {
        listeners[event] = [].concat(cb);
    }
}
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

EventEmitter.prototype.emit = function (event) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    this.listeners[event].forEach(cb => {
        cb.apply(null, args);
    });
}

EventEmitter.prototype.setMaxListeners = function (num) {
    this.maxListener = num;
}

EventEmitter.prototype.removeListener = function (event, listener) {
    var i = listeners[event].indexOf(listener);
    if (i > 0) {
        listeners[event].splice(i, 1);
    }
}

EventEmitter.prototype.removeAllListener = function (event) {
    listeners[event] = [];
}

EventEmitter.prototype.once = function (event, listener) {
    var self = this;
    this.on(event, function () {
        listener();
        self.removeListener(event, listener);
    })
}
