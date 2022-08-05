import http from "http";
import path from "path";
import ejs from "ejs";

const filePath = path.resolve("html/index.ejs");

console.log("server start");

http
  .createServer((req, res) => {
    console.log(req.url);

    if (req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      // 渲染文件 index.ejs
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
    }
  })
  .listen(8080);

console.log("localhost:8080");
