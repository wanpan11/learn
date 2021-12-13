const express = require('express');
const app = express();

const port = 4999;

/* jsonp */
app.use('/api', (req, res) => {
  const { query } = req;
  const callbackData = 'jsonp 数据';
  res.send(`${query.callback}('${callbackData}')`);
});

app.listen(port, () => {
  console.log(`端口为:${port}`);
});
