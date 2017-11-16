export class Stream {
  private _closed = false;
  private _write: (html: string) => any;
  private _close: () => any;

  write(html: string) {
    if (this._closed) {
      return;
    }
    if (this._write) {
      this._write(html);
    }
  }

  close() {
    if (this._close) {
      this._close();
    }
    this._closed = true;
  }

  isClosed(): boolean {
    return this._closed;
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
