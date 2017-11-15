var Stream = /** @class */ (function () {
    function Stream() {
        this.closed = false;
    }
    Stream.prototype.write = function (html) {
        if (this.closed) {
            return;
        }
        this._write(html);
    };
    Stream.prototype.close = function () {
        this._close();
        this.closed = true;
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
export { Stream };
//# sourceMappingURL=stream.js.map