const { Duplex } = require('stream');

// 创建一个双工流，既可读又可写
class EchoDuplex extends Duplex {
  constructor(options) {
    super(options);
    this.data = [];
  }

  _read(size) {
    if (this.data.length > 0) {
      this.push(this.data.shift());
    } else {
      this.push(null);
    }
  }

  _write(chunk, encoding, callback) {
    // 回显写入的数据
    this.data.push(chunk);
    console.log('Echoing:', chunk.toString());
    callback();
  }

  _final(callback) {
    console.log('Duplex stream ending');
    callback();
  }
}

const duplex = new EchoDuplex();

// 写入数据
duplex.write('Hello');
duplex.write(' World!');
duplex.end();

// 读取数据
duplex.on('data', (chunk) => {
  console.log('Read:', chunk.toString());
});

duplex.on('end', () => {
  console.log('Duplex ended');
});