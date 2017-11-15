# web-termjs
**Terminal emulator for browsers**

This repository got inspired by [SDA/terminal](https://github.com/SDA/terminal)

[Live Demo](https://danieldaeschle.github.io/web-termjs/)

## Quickstart

### **Browser**
Download or clone this repository or the dist folder and add it to your project.

Add following to the head in your HTML file:
```HTML
<link href="/path/to/web-termjs/dist/terminal.min.css">
<script src="/path/to/web-termjs/dist/terminal.min.js"></script>
```
Add a container which will hold the terminal like this:
```HTML
<body>
    <div id="terminal"></div>
</body>
```

Add another script after the `terminal.min.js` (in `<script>` tags or in a extra file) and add following example:
```JavaScript
var container = document.getElementById('terminal');
var term = new terminal.Terminal({
        welcome: 'Hi! :D',
        prompt: '',
        separator: '$',
        theme: 'dark'
    })
    .openIn(container)
    .onCommand(commands);

function commands(cmd, args, stream) {
    if (cmd === 'test') {
        stream.write('succeed');
    }
    stream.close();
}
```

**Or just run the `index.html` in example folder.**

### **NodeJS**

Download the package from NPM.
```
npm install --save web-termjs
```
Then import it and create the terminal.

#### **JavaScript**
```JavaScript
const Terminal = require('web-termjs').Terminal;

const term = new Terminal()
    .openIn(...)
    .onCommand(...);
```

#### **TypeScript**
```TypeScript
import { Terminal } from 'web-termjs';

const term: Terminal = new Terminal()
    .openIn(...)
    .onCommand(...);
```

#### **Angular 5 Example**
##### app.component.html
```HTML
<div #terminal></div>
```

##### app.component.ts
```TypeScript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Terminal, Stream } from 'web-termjs';
import { Options } from 'web-termjs/lib/options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('terminal') terminal: ElementRef;
  term: Terminal;

  ngAfterViewInit() {
    const options: Options = {
      welcome: 'Hello!',
      prompt: '',
      separator: '>',
      theme: 'light'
    };
    this.term = new Terminal(this.terminal.nativeElement, this.onCommand, options);
  }

  onCommand(cmd: string, args: string[], stream: Stream) {
    stream.write('Ok!');
    stream.close();
  }
}

```

## Custom Themes
Create a CSS file with following content which you can specify (with examples):

```CSS
# Font
.terminal-custom-name {
	color: black;
	font-family: monospace;
}

# Links
.terminal-custom-name a {
	color: #000;
}

# Background
.terminal-custom-name .background {
	background: #fff;
}

# Styles for the whole container
.terminal-custom-name .background .term-container {
    text-shadow: none;
    padding: 4px;
}

# Prompt
.terminal-custom-name .prompt {
	color: #02f;
}
```

Add this CSS file after `terminal.css` to your project.
Then you can define your theme in the options parameter
```TypeScript
theme: 'custom-name'
```
or set it with
```TypeScript
term.setTheme('custom-name');
```

## API
### **class Terminal**
#### constructor
```TypeScript
constructor(options: Options)
```
`options` has a default value:
```TypeScript
{
    welcome: '',
    prompt: '',
    separator: '$',
    theme: 'dark'
}
```

#### theme
```TypeScript
theme: string
```
Getter and setter of the theme

#### prompt
```TypeScript
prompt: string
```
Getter and setter of the prompt

#### container
```TypeScript
container: HTMLElement
```
Getter of the container

#### clear
```TypeScript
clear(): void
```
Clears the screen.

#### close
```TypeScript
close(): void
```
Removes the terminal from the website.

#### openIn
```TypeScript
openIn(container: HTMLElement): Terminal
```
Sets the container by the given parameter and starts it.

#### onCommand
```TypeScript
onCommand(exec: (cmd: string, args: string[], stream: Stream) => any): Terminal
```
Sets the function which will be called when a command has entered.

### **class Stream**
#### write
```TypeScript
write(html: string): void
```
Prints the given text (can be html style) into the terminal.
If you closed the stream you can't write into the terminal anymore.

#### close
```TypeScript
close(): void
```
Closes the stream. After this a new prompt appears.

### **interface Options**
```TypeScript
welcome: string
```
Will be shown on initialize terminal.

```TypeScript
prompt: string
```
Will be shown on every input at the beginning.

```TypeScript
separator: string
```
Separator between prompt and input.

```TypeScript
theme: string
```
Name of theme.

## License
Copyright 2017 Daniel Däschle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
