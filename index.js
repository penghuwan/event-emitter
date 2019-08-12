
function EventEmitter() {
    this.listeners = {};
    this.maxListener = 2;
}

EventEmitter.prototype.on = function (event, cb) {
    var listeners = this.listeners;
    // debugger;
    if (listeners[event] && listeners[event].length >= this.maxListener) {
        throw console.error('监听器的最大数量是%d,您已超出限制', this.maxListener)
    }
    if (listeners[event] instanceof Array) {
        if (listeners[event].indexOf(cb) === -1) {
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
    var listeners = this.listeners;
    var arr = listeners[event] || [];
    var i = arr.indexOf(listener);
    if (i >= 0) {
        listeners[event].splice(i, 1);
    }
}

EventEmitter.prototype.removeAllListener = function (event) {
    this.listeners[event] = [];
}

EventEmitter.prototype.once = function (event, listener) {
    var self = this;
    function fn() {
        var args = Array.prototype.slice.call(arguments);
        listener.apply(null, args);
        self.removeListener(event, fn);
    }
    this.on(event, fn)
}

