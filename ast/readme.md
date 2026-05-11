## AST 抽象语法树

---

> 将代码转换为 抽象语法树 后我们可以对其进行增删改查 转换为想要的代码

- 解析代码 @babel/parser

  - 分词
  - 语法分析
  - 生成 AST

---

- 修改 AST @babel/traverse

  - 修改 AST

---

- 生成代码片段 @babel/generator

  - 使用修改后的 AST 生成新的代码片段
