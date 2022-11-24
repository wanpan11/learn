const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 8181 });

/* 链接用例 client/src/pages/index.jsx */

wss.on("connection", function (ws) {
  console.log("client connected");

  ws.on("message", function (message) {
    console.log(message);
  });
});
