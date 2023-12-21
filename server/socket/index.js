const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 8181 });

wss.on("connection", function (ws) {
  console.log("client connected");

  ws.on("message", function (message) {
    console.log(message);
  });
});
