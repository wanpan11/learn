const { Readable, Writable } = require('node:stream')

// 快速生产数据的可读流
class FastReadable extends Readable {
  constructor() {
    super({ highWaterMark: 2 }) // 小缓冲区以演示背压
    this.count = 0
  }

  _read(size) {
    this.count++
    if (this.count <= 10) {
      const chunk = `Chunk ${this.count}\n`
      console.log('Producing:', chunk.trim())
      this.push(chunk)
    }
    else {
      this.push(null)
    }
  }
}

// 慢消费数据的可写流
class SlowWritable extends Writable {
  constructor() {
    super({ highWaterMark: 2 })
    this.delay = 100 // 100ms 延迟
  }

  _write(chunk, encoding, callback) {
    console.log('Consuming:', chunk.toString().trim())
    setTimeout(callback, this.delay)
  }
}

const readable = new FastReadable()
const writable = new SlowWritable()

// 监听背压事件
readable.on('data', (chunk) => {
  const shouldPause = !writable.write(chunk)
  if (shouldPause) {
    console.log('Backpressure detected, pausing readable')
    readable.pause()
    writable.once('drain', () => {
      console.log('Drain event, resuming readable')
      readable.resume()
    })
  }
})

readable.on('end', () => {
  writable.end()
})

writable.on('finish', () => {
  console.log('All data processed')
})
