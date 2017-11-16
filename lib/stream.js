"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream = /** @class */ (function () {
    function Stream() {
        this._closed = false;
    }
    Stream.prototype.write = function (html) {
        if (this._closed) {
            return;
        }
        if (this._write) {
            this._write(html);
        }
    };
    Stream.prototype.close = function () {
        if (this._close) {
            this._close();
        }
        this._closed = true;
    };
    Stream.prototype.isClosed = function () {
        return this._closed;
    };
    Stream.prototype.onWrite = function (callback) {
        this._write = callback;
        return this;
    };
    Stream.prototype.onClose = function (callback) {
        this._close = callback;
        return this;
    };
    return Stream;
}());
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map