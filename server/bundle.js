'use strict';

var http = require('http');
var path = require('path');
var ejs = require('ejs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var ejs__default = /*#__PURE__*/_interopDefaultLegacy(ejs);

const filePath = path__default["default"].resolve("view/index.ejs");
console.log('server start');
http__default["default"].createServer((req, res) => {
  console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    }); // 渲染文件 index.ejs

    ejs__default["default"].renderFile(filePath, {
      title: "react ssr",
      data: "首页"
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(data);
      }
    });
  }
}).listen(8080);
console.log('localhost:8080');
