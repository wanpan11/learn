const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");
const generator = require("@babel/generator");
const express = require("express");

const app = express();
const port = 4999;

app.use("/", (req, res) => {
  const { query } = req;

  let astSource;

  function compile(code) {
    // 1.parse
    const ast = parser.parse(code);
    astSource = ast;

    // 2,traverse
    const visitor = {
      CallExpression(path) {
        // 拿到 callee 数据
        const { callee } = path.node;

        // 判断是否是调用了 console.log 方法
        // 1. 判断是否是成员表达式节点，上面截图有详细介绍
        // 2. 判断是否是 console 对象
        // 3. 判断对象的属性是否是 log
        const isConsoleLog =
          types.isMemberExpression(callee) &&
          callee.object.name === "console" &&
          callee.property.name === "log";

        if (isConsoleLog) {
          // 如果是 console.log 的调用 找到上一个父节点是函数
          const funcPath = path.findParent(p => {
            return p.isFunctionDeclaration();
          });

          // 取函数的名称
          const funcName = funcPath.node.id.name;

          // 将名称通过 types 来放到函数的参数前面去
          path.node.arguments.unshift(types.stringLiteral(funcName));
        }
      },
    };

    // traverse 转换代码
    traverse.default(ast, visitor);

    // 3. generator 将 AST 转回成代码
    return generator.default(ast, {}, code);
  }

  const code = `function getData() {
    const wanpan = 'ast'
    console.log("ast")
    console.log("data")
    return 'function getData'
  }`;

  const newCode = compile(code);

  res.send(astSource);
});

app.listen(port, () => {
  console.log(`端口为:${port}`);
});
