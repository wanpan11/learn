/* eslint-disable node/no-deprecated-api */
const http = require('node:http')
const url = require('node:url')

const routers = {
  '/': [
    'GET',
    '/',
    (method, request, response) => {
      console.log('router_1', method)
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Access-Control-Max-Age': 1728000,
        'Content-Type': 'application/json; charset=utf-8',
      })
      response.end('000')
    },
  ],
  'tcp': [
    'GET',
    '/tcp',
    (method, request, response) => {
      console.log('router_1', method)
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Access-Control-Max-Age': 1728000,
        'Content-Type': 'application/json; charset=utf-8',
      })
      response.end('111')
    },
  ],
}

const port = 8888

function route(pathname, request, response) {
  const key = Object.keys(routers)
  key.forEach((el) => {
    const [method, path, callback] = routers[el]
    if (path === pathname) {
      callback(method, request, response)
    }
  })
}

function start(route) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname
    route(pathname, request, response)
  }

  http.createServer(onRequest).listen(port)
  console.log(`Server has started. ${port}`)
}

start(route)
