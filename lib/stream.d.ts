export declare class Stream {
    private _closed;
    private _write;
    private _close;
    write(html: string): void;
    close(): void;
    isClosed(): boolean;
    onWrite(callback: (html: string) => any): Stream;
    onClose(callback: () => any): Stream;
}
