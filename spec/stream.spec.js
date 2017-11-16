const { Stream } = require('../lib/terminal');

describe('Stream', () => {
  let stream;

  beforeEach(() => {
    stream = new Stream();
  });

  it('should be created', () => {
    expect(stream).toBeDefined();
  });

  it('should write "foo"', () => {
    let output = '';
    stream.onWrite((text) => {
      output += text;
    });
    stream.write('foo');
    expect(output).toBe('foo');
  });

  it('should close', () => {
    stream.close()
    expect(stream.isClosed()).toBeTruthy();
  });

  it('should called onClose when it gets closed', () => {
    let closed = false;
    stream.onClose(() => {
      closed = true;
    });
    stream.close();
    expect(closed).toBeTruthy();
  });

  it('should not write "foo" after close', () => {
    let output = '';
    stream.onWrite((text) => {
      output += text;
    });
    stream.close();
    stream.write('foo');
    expect(output).toBe('');
  });

  afterEach(() => {
    stream = undefined;
  });
});
