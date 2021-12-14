const http = require('http');
const url = require('url');
const routers = require('./router');

const port = 8888;

function route(pathname, request, response) {
  const key = Object.keys(routers);
  key.forEach(el => {
    const [method, path, callback] = routers[el];
    if (path === pathname) {
      callback(method, request, response);
    }
  });
}

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(pathname, request, response);
  }

  http.createServer(onRequest).listen(port);
  console.log('Server has started. ' + port);
}

start(route);
