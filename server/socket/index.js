const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const ejs = require("ejs");

const filePath = path.resolve("../html/index.ejs");

app.get("/", (req, res) => {
  ejs.renderFile(
    filePath,
    {
      title: "react ssr",
      data: "首页",
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(data);
      }
    }
  );
});

io.on("connection", socket => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
