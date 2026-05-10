const { Readable, Writable } = require('stream');

// 创建可读流
class SourceStream extends Readable {
  constructor() {
    super();
    this.data = ['Line 1\n', 'Line 2\n', 'Line 3\n'];
    this.index = 0;
  }

  _read() {
    if (this.index < this.data.length) {
      this.push(this.data[this.index++]);
    } else {
      this.push(null);
    }
  }
}

// 创建可写流
class DestinationStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log('Received:', chunk.toString().trim());
    callback();
  }
}

const source = new SourceStream();
const destination = new DestinationStream();

// 使用管道连接流
source.pipe(destination);