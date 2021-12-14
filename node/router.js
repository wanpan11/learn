module.exports = {
  tcp: [
    'GET',
    '/tcp',
    (method, request, response) => {
      console.log('router_1', method);
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Access-Control-Max-Age': 1728000,
        'Content-Type': 'application/json; charset=utf-8',
      });
      response.end('111');
    },
  ],
};
