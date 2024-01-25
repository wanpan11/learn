const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const https = require("https");
const ejs = require("ejs");

const port = 4999;
const port_s = 443;
const filePath = path.resolve(__dirname, "../html/index.ejs");

const privateKey = fs.readFileSync(path.resolve(__dirname, "../ssl/private.key"));
const certificate = fs.readFileSync(path.resolve(__dirname, "../ssl/server.crt"));
const credentials = { key: privateKey, cert: certificate };

const app = express();
http.createServer(app).listen(port, () => {
  console.log("http ===>", port);
});
https.createServer(credentials, app).listen(port_s, () => {
  console.log("https ===>", port_s);
});

/* jsonp */
app.use("/api", (req, res) => {
  const { query } = req;
  const callbackData = "jsonp 数据";
  res.send(`${query.callback}('${callbackData}')`);
});

/*  */
app.use("/tcp", (req, res) => {
  setTimeout(() => {
    res.cookie("server", "yes", {
      domain: ".server.com",
      sameSite: "None",
      secure: true,
    });

    res.cookie("server_id", "/** @type {import('axios')} */", {
      domain: ".server.com",
      sameSite: "None",
      secure: true,
    });

    res.cookie("server_port", "99999999", {
      domain: ".server.com",
      sameSite: "None",
      secure: true,
    });

    res.set({
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Access-Control-Max-Age": 1728000,
      "Content-Type": "application/json; charset=utf-8",
    });

    res.send({ code: 0, data: "tcp" });
  }, 2000);
});

/*  */
app.use("/post", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Access-Control-Max-Age": 1728000,
    "Content-Type": "application/json; charset=utf-8",
  });

  res.send({ code: 0, data: "post" });
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
