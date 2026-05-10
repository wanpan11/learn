const fs = require('node:fs')
const path = require('node:path')
const { Readable, Writable } = require('node:stream')

// 创建一个会出错的可读流
class ErrorReadable extends Readable {
  constructor() {
    super()
    this.data = ['data1', 'data2', 'error', 'data3']
    this.index = 0
  }

  _read() {
    if (this.index < this.data.length) {
      const chunk = this.data[this.index++]
      if (chunk === 'error') {
        this.emit('error', new Error('Simulated read error'))
      }
      else {
        this.push(chunk)
      }
    }
    else {
      this.push(null)
    }
  }
}

// 创建一个会出错的可写流
class ErrorWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString() === 'data2') {
      callback(new Error('Simulated write error'))
    }
    else {
      console.log('Written:', chunk.toString())
      callback()
    }
  }
}

const readable = new ErrorReadable()
const writable = new ErrorWritable()

// 处理错误
readable.on('error', (err) => {
  console.error('Readable error:', err.message)
})

writable.on('error', (err) => {
  console.error('Writable error:', err.message)
})

// 管道连接
readable.pipe(writable)

// 文件流错误处理示例
const nonExistentFile = path.join(__dirname, 'nonexistent.txt')
const readStream = fs.createReadStream(nonExistentFile)

readStream.on('error', (err) => {
  console.error('File read error:', err.message)
})
