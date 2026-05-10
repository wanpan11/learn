const { Transform } = require('stream');

// 创建一个转换流，将输入转换为大写
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();
    this.push(upperCaseChunk);
    callback();
  }
}

const { Readable } = require('stream');

class SourceStream extends Readable {
  constructor() {
    super();
    this.data = ['hello ', 'world!'];
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

const source = new SourceStream();
const transform = new UpperCaseTransform();

source.pipe(transform).on('data', (chunk) => {
  console.log('Transformed:', chunk.toString());
});