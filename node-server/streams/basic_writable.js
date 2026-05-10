const { Writable } = require('stream');

// 创建一个简单的可写流
class MyWritable extends Writable {
  constructor(options) {
    super(options);
    this.data = [];
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk.toString());
    console.log('Writing:', chunk.toString());
    callback();
  }

  _final(callback) {
    console.log('All data written:', this.data.join(''));
    callback();
  }
}

const writable = new MyWritable();
writable.write('Hello ');
writable.write('World!');
writable.end();