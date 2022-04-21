const express = require("express");
const app = express();

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

app.listen(port, () => {
  console.log(`端口为:${port}`);
});
