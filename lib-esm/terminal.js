import { Stream } from './stream';
var Terminal = /** @class */ (function () {
    function Terminal(options) {
        if (options === void 0) { options = {
            welcome: '',
            prompt: '',
            separator: '$',
            theme: 'dark'
        }; }
        this.options = options;
        this.histtemp = '';
        this.history = window.localStorage.getItem('history') ? JSON.parse(window.localStorage.getItem('history')) : [];
        this.histpos = this.history.length;
    }
    Terminal.prototype.setupTerminal = function () {
        var _this = this;
        this.container.classList.add('terminal');
        this.container.classList.add("terminal-" + this.options.theme);
        this.container.insertAdjacentHTML('beforeend', "\n            <div class=\"background\">\n              <div class=\"term-container\">\n                <output></output>\n                <table class=\"input-line\">\n                    <tr>\n                        <td nowrap>\n                            <div class=\"prompt\">" + this.options.prompt + this.options.separator + "</div>\n                        </td>\n                        <td width=\"100%\">\n                            <input class=\"cmdline\" autofocus spellcheck=\"false\" />\n                        </td>\n                    </tr>\n                </table>\n              </div>\n            </div>\n        ");
        this.termContainer = this.container.querySelector('.term-container');
        this.inputLine = this.termContainer.querySelector('.input-line');
        this.cmdLine = this.termContainer.querySelector('.input-line .cmdline');
        this.output = this.termContainer.querySelector('output');
        this._prompt = this.termContainer.querySelector('.prompt');
        this.background = document.querySelector('.background');
        this.output.addEventListener('DOMSubtreeModified', function (e) {
            setTimeout(function () {
                _this.cmdLine.scrollIntoView();
            }, 0);
        });
        if (this.options.welcome) {
            this.write(this.options.welcome);
        }
        window.addEventListener('click', function (e) {
            _this.cmdLine.focus();
        }, false);
        this.output.addEventListener('click', function (e) {
            e.stopPropagation();
        }, false);
        var terminal = this;
        this.cmdLine.addEventListener('click', function (e) {
            terminal.inputTextClick(e, this);
        }, false);
        this.inputLine.addEventListener('click', function (e) {
            _this.cmdLine.focus();
        }, false);
        this.cmdLine.addEventListener('keyup', function (e) {
            terminal.historyHandler(e, this);
        }, false);
        this.cmdLine.addEventListener('keydown', function (e) {
            terminal.processNewCommand(terminal, e, this);
        }, false);
        window.addEventListener('keyup', function (e) {
            _this.cmdLine.focus();
            e.stopPropagation();
            e.preventDefault();
        }, false);
    };
    Terminal.prototype.processNewCommand = function (self, e, node) {
        var _this = this;
        // Only handle the Enter key.
        if (e.keyCode !== 13) {
            return;
        }
        var cmdline = node.value;
        // Save shell history.
        if (cmdline) {
            this.history[this.history.length] = cmdline;
            window.localStorage.setItem('history', JSON.stringify(this.history));
            this.histpos = this.history.length;
        }
        // Duplicate current input and append to output section.
        var line = node.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
        line.removeAttribute('id');
        line.classList.add('line');
        var input = line.querySelector('input.cmdline');
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
        var args;
        var cmd;
        if (cmdline && cmdline.trim()) {
            args = cmdline.split(' ').filter(function (val, i) {
                return val;
            });
            cmd = args[0];
            args = args.splice(1); // Remove cmd from arg list.
        }
        if (cmd) {
            var stream = new Stream()
                .onClose(function () {
                _this.inputLine.classList.remove('hidden');
            })
                .onWrite(function (html) {
                _this.write(html);
            });
            if (this.exec !== null) {
                this.exec(cmd, args, stream);
            }
        }
    };
    Terminal.prototype.inputTextClick = function (e, node) {
        node.value = node.value;
    };
    Terminal.prototype.historyHandler = function (e, node) {
        // Clear command-line on Escape key.
        if (e.keyCode === 27) {
            node.value = '';
            e.stopPropagation();
            e.preventDefault();
        }
        if (this.history.length && (e.keyCode === 38 || e.keyCode === 40)) {
            if (this.history[this.histpos]) {
                this.history[this.histpos] = node.value;
            }
            else {
                this.histtemp = node.value;
            }
            if (e.keyCode === 38) {
                // Up arrow key.
                this.histpos--;
                if (this.histpos < 0) {
                    this.histpos = 0;
                }
            }
            else if (e.keyCode === 40) {
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
    };
    Terminal.prototype.write = function (html) {
        this.output.insertAdjacentHTML('beforeend', html);
        this.cmdLine.scrollIntoView();
    };
    Terminal.prototype.openIn = function (container) {
        if (!container) {
            throw new Error('Given container is undefined');
        }
        this.container = container;
        this.setupTerminal();
        return this;
    };
    Terminal.prototype.onCommand = function (exec) {
        this.exec = exec;
        return this;
    };
    Terminal.prototype.close = function () {
        if (this.container) {
            this.container.classList.remove('terminal');
            this.container.classList.remove("terminal-" + this.options.theme);
            this.termContainer.remove();
        }
    };
    Terminal.prototype.clear = function (node) {
        if (this.container) {
            this.output.innerHTML = '';
            this.cmdLine.value = '';
            this.background.style.minHeight = '';
        }
    };
    Object.defineProperty(Terminal.prototype, "theme", {
        get: function () {
            return this.options.theme;
        },
        set: function (theme) {
            if (this.container) {
                this.container.classList.remove("terminal-" + this.options.theme);
                this.options.theme = theme;
                this.container.classList.add("terminal-" + this.options.theme);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Terminal.prototype, "prompt", {
        get: function () {
            if (this.container) {
                return this._prompt.innerHTML.replace(new RegExp(this.options.separator + '$'), '');
            }
        },
        set: function (prompt) {
            if (this.container) {
                this._prompt.innerHTML = prompt + this.options.separator;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Terminal;
}());
export { Terminal };
export { Stream };
//# sourceMappingURL=terminal.js.map