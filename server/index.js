//node ssr 初代服务端渲染
const ejs = require("ejs");
const http = require("http");
const path = require("path");
const filePath = path.resolve(__dirname, "./view/index.ejs");

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
