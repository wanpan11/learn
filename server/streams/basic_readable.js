const { Readable } = require('stream');

// 创建一个简单的可读流
class MyReadable extends Readable {
  constructor(options) {
    super(options);
    this.data = ['Hello', ' ', 'World', '!'];
    this.index = 0;
  }

  _read(size) {
    if (this.index < this.data.length) {
      this.push(this.data[this.index++]);
    } else {
      this.push(null); // 结束流
    }
  }
}

const readable = new MyReadable();
readable.on('data', (chunk) => {
  console.log('Received:', chunk.toString());
});

readable.on('end', () => {
  console.log('Stream ended');
});