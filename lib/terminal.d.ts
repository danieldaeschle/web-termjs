import { Options } from './options';
import { Stream } from './stream';
export declare class Terminal {
    private options;
    container: HTMLElement;
    private history;
    private histpos;
    private histtemp;
    private exec;
    private termContainer;
    private inputLine;
    private cmdLine;
    private output;
    private _prompt;
    private background;
    constructor(options?: Options);
    private setupTerminal();
    private processNewCommand(self, e, node);
    private inputTextClick(e, node);
    private historyHandler(e, node);
    private write(html);
    openIn(container: HTMLElement): Terminal;
    onCommand(exec: (cmd: string, args: string[], stream: Stream) => any): Terminal;
    close(): void;
    clear(node: any): void;
    theme: string;
    prompt: string;
}
export { Stream, Options };
