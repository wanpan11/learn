const fs = require('node:fs')
const http = require('node:http')
const path = require('node:path')

// 创建一个简单的HTTP服务器，使用流处理请求和响应
const server = http.createServer((req, res) => {
  if (req.url === '/stream') {
    // 设置响应头
    res.writeHead(200, { 'Content-Type': 'text/plain' })

    // 创建可读流
    const { Readable } = require('node:stream')
    class DataStream extends Readable {
      constructor() {
        super()
        this.data = ['Chunk 1\n', 'Chunk 2\n', 'Chunk 3\n']
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

    const dataStream = new DataStream()
    dataStream.pipe(res)
  }
  else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(3000, () => {
  console.log('Server listening on port 3000')

  // 模拟客户端请求
  const req = http.get('http://localhost:3000/stream', (res) => {
    console.log('Response status:', res.statusCode)
    res.on('data', (chunk) => {
      console.log('Received:', chunk.toString().trim())
    })
    res.on('end', () => {
      console.log('Response ended')
      server.close()
    })
  })
})
