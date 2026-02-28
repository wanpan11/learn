const { Readable, Writable, Transform, Duplex } = require('node:stream')

// 自定义可读流
class CustomReadable extends Readable {
  constructor(data) {
    super()
    this.data = data
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

// 自定义可写流
class CustomWritable extends Writable {
  constructor() {
    super()
    this.chunks = []
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk)
    callback()
  }

  _final(callback) {
    console.log('All chunks:', this.chunks.map(c => c.toString()))
    callback()
  }
}

// 自定义转换流
class CustomTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = chunk.toString().toUpperCase()
    this.push(transformed)
    callback()
  }
}

// 自定义双工流
class CustomDuplex extends Duplex {
  constructor() {
    super()
    this.readData = ['Echo: ']
  }

  _read() {
    if (this.readData.length > 0) {
      this.push(this.readData.shift())
    }
    else {
      this.push(null)
    }
  }

  _write(chunk, encoding, callback) {
    this.readData.push(chunk.toString())
    callback()
  }
}

// 测试自定义流
const readable = new CustomReadable(['hello ', 'world'])
const writable = new CustomWritable()
const transform = new CustomTransform()
const duplex = new CustomDuplex()

// 管道连接
readable.pipe(transform).pipe(writable)

// 双工流测试
duplex.write('test')
duplex.end()

duplex.on('data', (chunk) => {
  console.log('Duplex read:', chunk.toString())
})
