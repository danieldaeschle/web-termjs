import { SIGUNUSED } from 'constants';
import { promisify } from 'util';

const { Terminal } = require('../lib/terminal');

describe('Terminal', () => {
  let mockDom;
  let terminal;

  beforeEach(() => {
    terminal = new Terminal();
    mockDom = document.createElement('div');
  });

  it('should be created', () => {
    expect(terminal).toBeDefined();
  });

  describe('openIn', () => {
    it('should setup everything', () => {
      terminal.openIn(mockDom);
      const termContainer = mockDom.getElementsByClassName('term-container').item(0);
      expect(termContainer).toBeDefined();
    });

    it('should throw an error', () => {
      expect(() => {
        terminal.openIn()
      }).toThrowError();
    });
  });

  describe('onCommand', () => {
    it('should set callback function', () => {
      expect(() => terminal.onCommand((cmd, args, stream) => {})).not.toThrowError();
    });

    it('should throw an error', () => {
      expect(() => terminal.onCommand()).toThrowError();
    });
  });

  describe('close', () => {
    it('should remove the terminal', () => {
      terminal.openIn(mockDom).close();
      expect(mockDom.getElementsByClassName('term-container').item(0)).toBeFalsy();
    });
  });

  describe('clear', () =>{
    it('should clear the terminal', () => {
      terminal.openIn(mockDom);
      terminal.clear();
      const output = mockDom.querySelector('output');
      expect(output.innerHTML).toBe('');
    });
  });

  describe('theme', () => {
    it('should be "dark"', () => {
      expect(terminal.theme).toBe('dark');
    });

    it('should change it', () => {
      terminal.openIn(mockDom);
      terminal.theme = 'light';
      expect(terminal.theme).toBe('light');
    });
  });

  describe('prompt', () => {
    it('should set and get it', () => {
      terminal.openIn(mockDom);
      terminal.prompt = 'test';
      expect(terminal.prompt).toBe('test');
    });
  });

  describe('container', () => {
    it('should not undefined', () => {
      expect(terminal.openIn(mockDom)).toBeDefined();
    });
  });

  afterEach(() => {
    terminal = undefined;
    mockDom = undefined;
  });
})