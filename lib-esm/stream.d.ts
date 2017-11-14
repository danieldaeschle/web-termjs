export declare class Stream {
    private closed;
    private _write;
    private _close;
    write(html: string): void;
    close(): void;
    onWrite(callback: (html: string) => any): Stream;
    onClose(callback: () => any): Stream;
}
