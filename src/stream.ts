export class Stream {
    private closed = false;
    private _write: (html: string) => any;
    private _close: () => any;

    write(html: string) {
        if (this.closed) {
            return;
        }
        this._write(html);
    }

    close() {
        this._close();
        this.closed = true;
    }

    onWrite(callback: (html: string) => any): Stream {
        this._write = callback;
        return this;
    }

    onClose(callback: () => any): Stream {
        this._close = callback;
        return this;
    }
}
