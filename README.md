# web-termjs
**Terminal emulator for browsers**<br>
This repository got inspired by [SDA/terminal](https://github.com/SDA/terminal)

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
var term = new terminal.Terminal(container, commands, {
    welcome: 'Hi! :D',
    prompt: '',
    separator: '$',
    theme: 'dark'
});

function commands(cmd, args, stream) {
    if (cmd === 'test') {
        stream.write('succeed');
    }
    stream.close();
}
```

**Or just run the `index.html` in example folder.**

### **NodeJS**
Coming soon.

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
constructor(
    container: HTMLElement,
    exec: (cmd: string, args: string[], stream: Stream) => any,
    options: Options
)
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

#### clear
```TypeScript
clean(): void
```
Clears the screen.

#### setTheme
```TypeScript
setTheme(theme: string): void
```
Changes the theme.

#### getTheme
```TypeScript
getTheme(): string
```
Returns the current theme.

#### setPrompt
```TypeScript
setPrompt(prompt: string): void
```
Changes the prompt.

#### getPrompt
```TypeScript
getPrompt(): string
```
Returns the current prompt.

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
