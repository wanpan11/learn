const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const app = express();
const filePath = path.resolve(__dirname, "../html/index.ejs");

const port = 4999;

/* jsonp */
app.use("/api", (req, res) => {
  const { query } = req;
  const callbackData = "jsonp 数据";
  res.send(`${query.callback}('${callbackData}')`);
});

/*  */
app.use("/tcp", (req, res) => {
  console.log(res);
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Access-Control-Max-Age": 1728000,
    "Content-Type": "application/json; charset=utf-8",
  });

  res.send(`done`);
});

/*  */
app.use("/post", (req, res) => {
  console.log(res);
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Access-Control-Max-Age": 1728000,
    "Content-Type": "application/json; charset=utf-8",
  });

  res.send(`done`);
});

/*  */
app.use("/index", (req, res) => {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      return console.error(err);
    }

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
});

// app.use("/*", (req, res) => {
//   console.log("name ===> ");
// });

app.use(express.static(path.resolve(__dirname, "./dist")));

app.listen(port, () => {
  console.log(`端口为:${port}`);
});
