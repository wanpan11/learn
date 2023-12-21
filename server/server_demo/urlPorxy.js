const express = require("express");

// 定义服务器端口号
const port = 2111;
// 创建 Express 应用程序
const app = express();

// 启动服务器并监听指定端口号
app.listen(port, () => {
  console.log("port ===>", port);
});

// 处理根目录下的请求
app.use("/", (req, res) => {
  // 获取请求参数中的 URL
  const url = req.query.url;

  // 使用 fetch 方法获取 URL 所指向的数据
  fetch(url)
    .then(data => {
      return data.arrayBuffer(); // 转换数据
    })
    .then(data => {
      // 将获取到的数据转换为二进制数据
      const binaryData = Buffer.from(data, "utf-8");

      // 设置响应头，指定内容类型为二进制流
      res.setHeader("Content-Type", "application/octet-stream");

      // 发送二进制数据作为响应
      res.send(binaryData);
    });
});
