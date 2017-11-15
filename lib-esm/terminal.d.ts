import { Options } from './options';
export declare class Terminal {
    private container;
    private exec;
    private options;
    private history;
    private histpos;
    private histtemp;
    private termContainer;
    private inputLine;
    private cmdLine;
    private output;
    private prompt;
    private background;
    constructor(container: HTMLElement, exec: Function, options?: Options);
    private setupTerminal();
    private processNewCommand(self, e, node);
    private inputTextClick(e, node);
    private historyHandler(e, node);
    private write(html);
    clear(node: any): void;
    setTheme(theme: string): void;
    getTheme(): string;
    setPrompt(prompt: string): void;
    getPromt(): string;
}
