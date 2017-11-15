# web-termjs
Terminal emulator for browsers

## Quickstart


## Custom Themes

## API
### Terminal
#### clear
```
clean(): void
```
Clears the screen.

#### setTheme
```
setTheme(theme: string): void
```
Changes the theme.

#### getTheme
```
getTheme(): string
```
Returns the current theme.

#### setPrompt
```
setPrompt(prompt: string): void
```
Changes the prompt.

#### getPrompt
```
getPrompt(): string
```
Returns the current prompt.

### Stream
#### write
```
write(html: string): void
```
Prints the given text (can be html style) into the terminal.
If you closed the stream you can't write into the terminal anymore.

#### close
```
close(): void
```
Closes the stream. After this a new prompt appears.

## License
Copyright 2017 Daniel Däschle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
