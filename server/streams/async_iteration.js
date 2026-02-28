const { Readable } = require('node:stream')

// 创建可读流
class DataStream extends Readable {
  constructor() {
    super({ objectMode: true })
    this.data = [1, 2, 3, 4, 5]
    this.index = 0
  }

  _read() {
    if (this.index < this.data.length) {
      this.push(this.data[this.index++])
    }
    else {
      this.push(null)
    }
  }
}

async function processStream() {
  const stream = new DataStream()

  // 使用异步迭代器
  for await (const chunk of stream) {
    console.log('Processed:', chunk * 2)
  }

  console.log('Stream processing complete')
}

processStream()
