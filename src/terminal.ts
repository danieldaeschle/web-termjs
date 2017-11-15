import { Options } from './options';
import { Stream } from './stream';

export class Terminal {
  container: HTMLElement;
  private history: any[];
  private histpos: number;
  private histtemp = '';
  private exec: (cmd: string, args: string[], stream: Stream) => any;
  private termContainer: HTMLElement;
  private inputLine: HTMLElement;
  private cmdLine: any;
  private output: HTMLElement;
  private _prompt: HTMLElement;
  private background: HTMLElement;

  constructor(private options: Options = {
      welcome: '',
      prompt: '',
      separator: '$',
      theme: 'dark'
  }) {
    this.history = window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : [];
    this.histpos = this.history.length;
  }

  private setupTerminal() {
    this.container.classList.add('terminal');
    this.container.classList.add(`terminal-${this.options.theme}`);
    this.container.insertAdjacentHTML('beforeend', `
            <div class="background">
              <div class="term-container">
                <output></output>
                <table class="input-line">
                    <tr>
                        <td nowrap>
                            <div class="prompt">${this.options.prompt}${this.options.separator}</div>
                        </td>
                        <td width="100%">
                            <input class="cmdline" autofocus spellcheck="false" />
                        </td>
                    </tr>
                </table>
              </div>
            </div>
        `);

    this.termContainer = this.container.querySelector('.term-container') as HTMLElement;
    this.inputLine = this.termContainer.querySelector('.input-line') as HTMLElement;
    this.cmdLine = this.termContainer.querySelector('.input-line .cmdline') as HTMLElement;
    this.output = this.termContainer.querySelector('output') as HTMLElement;
    this._prompt = this.termContainer.querySelector('.prompt') as HTMLElement;
    this.background = document.querySelector('.background') as HTMLElement;

    this.output.addEventListener('DOMSubtreeModified', (e) => {
      setTimeout(() => {
        this.cmdLine.scrollIntoView();
      }, 0);
    });

    if (this.options.welcome) {
      this.write(this.options.welcome);
    }

    window.addEventListener('click', (e) => {
      this.cmdLine.focus();
    }, false);

    this.output.addEventListener('click', (e) => {
      e.stopPropagation();
    }, false);

    const terminal = this;

    this.cmdLine.addEventListener('click', function(e) {
      terminal.inputTextClick(e, this);
    }, false);

    this.inputLine.addEventListener('click', (e) => {
      this.cmdLine.focus();
    }, false);

    this.cmdLine.addEventListener('keyup', function(e) {
      terminal.historyHandler(e, this);
    }, false);

    this.cmdLine.addEventListener('keydown', function(e) {
      terminal.processNewCommand(terminal, e, this);
    }, false);

    window.addEventListener('keyup', (e) => {
      this.cmdLine.focus();
      e.stopPropagation();
      e.preventDefault();
    }, false);
  }

  private processNewCommand(self: Terminal, e: any, node: any) {
    // Only handle the Enter key.
    if (e.keyCode !== 13) {
      return;
    }

    const cmdline = node.value;

    // Save shell history.
    if (cmdline) {
      this.history[this.history.length] = cmdline;
      window.localStorage.setItem('history', JSON.stringify(this.history));
      this.histpos = this.history.length;
    }

    // Duplicate current input and append to output section.
    const line = node.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
    line.removeAttribute('id');
    line.classList.add('line');

    const input = line.querySelector('input.cmdline');
    input.autofocus = false;
    input.readOnly = true;
    input.insertAdjacentHTML('beforebegin', input.value);
    input.parentNode.removeChild(input);
    this.output.appendChild(line);

    // Hide command line until we're done processing input.
    this.inputLine.classList.add('hidden');

    // Clear/setup line for next input.
    node.value = '';

    // Parse out command, args, and trim off whitespace.
    let args;
    let cmd;
    if (cmdline && cmdline.trim()) {
      args = cmdline.split(' ').filter(function (val, i) {
        return val;
      });
      cmd = args[0];
      args = args.splice(1); // Remove cmd from arg list.
    }

    if (cmd) {
      const stream = new Stream()
        .onClose(() => {
          this.inputLine.classList.remove('hidden');
        })
        .onWrite((html: string) => {
          this.write(html);
        });
      if (this.exec !== null) {
        this.exec(cmd, args, stream);
      }
    }
  }

  private inputTextClick(e: any, node) {
    node.value = node.value;
  }

  private historyHandler(e, node) {
    // Clear command-line on Escape key.
    if (e.keyCode === 27) {
      node.value = '';
      e.stopPropagation();
      e.preventDefault();
    }

    if (this.history.length && (e.keyCode === 38 || e.keyCode === 40)) {
      if (this.history[this.histpos]) {
        this.history[this.histpos] = node.value;
      } else {
        this.histtemp = node.value;
      }

      if (e.keyCode === 38) {
        // Up arrow key.
        this.histpos--;
        if (this.histpos < 0) {
          this.histpos = 0;
        }
      } else if (e.keyCode === 40) {
        // Down arrow key.
        this.histpos++;
        if (this.histpos > this.history.length) {
          this.histpos = this.history.length;
        }
      }

      node.value = this.history[this.histpos] ? this.history[this.histpos] : this.histtemp;

      // Move cursor to end of input.
      node.value = node.value;
    }
  }

  private write(html: string) {
    this.output.insertAdjacentHTML('beforeend', html);
    this.cmdLine.scrollIntoView();
  }

  openIn(container: HTMLElement): Terminal {
    if (!container) {
      throw new Error('Given container is undefined');
    }
    this.container = container;
    this.setupTerminal();
    return this;
  }

  onCommand(exec: (cmd: string, args: string[], stream: Stream) => any): Terminal {
    this.exec = exec;
    return this;
  }

  close() {
    if (this.container) {
      this.container.classList.remove('terminal');
      this.container.classList.remove(`terminal-${this.options.theme}`);
      this.termContainer.remove();
    }
  }

  clear(node: HTMLElement) {
    if (this.container) {
      this.output.innerHTML = '';
      this.cmdLine.value = '';
      this.background.style.minHeight = '';
    }
  }

  set theme(theme: string) {
    if (this.container) {
      this.container.classList.remove(`terminal-${this.options.theme}`);
      this.options.theme = theme;
      this.container.classList.add(`terminal-${this.options.theme}`);
    }
  }

  get theme(): string {
    return this.options.theme;
  }

  set prompt(prompt: string) {
    if (this.container) {
      this._prompt.innerHTML = prompt + this.options.separator;
    }
  }

  get prompt(): string {
    if (this.container) {
      return this._prompt.innerHTML.replace(new RegExp(this.options.separator + '$'), '');
    }
  }
}

export { Stream, Options };
