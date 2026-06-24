# Async/Await 实现原理分析

`async/await` 是 **Generator（生成器）+ Promise** 的语法糖。通过编译器（如 Babel）的降级处理，我们可以看到其底层实现主要依赖于**状态机转换**和**自动执行器**。

## 1. 核心思想：Generator + Promise

`async/await` 的本质是将异步流程同步化。它的执行依赖于一个“执行器”，该执行器会自动驱动 Generator 迭代器，并在 `yield`（即 `await`）处等待 Promise 的结果。

## 2. 三个关键组成部分

### A. 自动执行器 (`_asyncToGenerator`)
这是逻辑的入口。它返回一个新函数，该函数返回一个 Promise。在内部，它启动迭代器并递归地执行 `next`。

```javascript
function _asyncToGenerator(fn) {
  return function () {
    const self = this, args = arguments;
    return new Promise((resolve, reject) => {
      const gen = fn.apply(self, args);
      function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value); }
      function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err); }
      _next(undefined);
    });
  };
}
```

### B. 步进控制 (`asyncGeneratorStep`)
负责处理每一层 `yield`。
- **状态未完成**：将 `yield` 后的值包装成 `Promise.resolve(value)`。在 `.then(success, fail)` 中注册下一次迭代（`_next` 或 `_throw`）。
- **状态已完成**：将最终结果 `resolve` 出去。

### C. 状态机转换 (`_regenerator`)
编译器会将 `async` 函数体拆解为一个基于 `switch-case` 的状态机。

```javascript
// 模拟降级后的 logined 函数
switch (_context.n) {
  case 0:
    a = 1; // 同步逻辑执行
    _context.n = 1; // 更新下一步状态
    return getUserInfo(); // yield 暂停
  case 1:
    userInfo = _context.v; // 恢复执行，获取异步结果
    console.log(111);
    return _context.stop();
}
```

## 3. 进阶特性：变量持久化

在 `async` 函数内部定义的局部变量（如 `const a = 1`），在降级后会被**提升（Hoisted）**到状态机外部的闭包作用域中。

- **原因**：状态机函数在每次异步唤醒时会重新执行。如果变量定义在 `switch` 内部，重新进入时状态会丢失。
- **实现**：通过闭包保留变量引用，确保函数在 `await` 处“断开”后重新进入时，能完美恢复之前的执行现场。

## 4. 直白版总结

如果把 `async` 函数比作“读一本书”，那么它的暂停与恢复逻辑如下：

1.  **遇到 await**：并不是卡在那里不动，而是**放个书签**（`_context.n = 1`），然后**把书合上**（`return` 退出函数）。
2.  **异步等待**：这时候主线程是空的，可以去干别的事。
3.  **异步完成**：等 Promise 成功了，执行器（监工）会**重新打开书**。
4.  **恢复执行**：函数一进来，先看书签在哪，然后 `switch` 直接跳到对应的 `case` 继续往后读。

## 5. 隐藏的那个 `.then()` 在哪？

你可能发现在 `switch-case` 代码块里根本没有 `.then`。其实它被隐藏在了**执行器（监工）**内部：

- **代码位置**：`asyncGeneratorStep` 函数中。
- **具体逻辑**：
  ```javascript
  // 监工发现你还没干完活（done 为 false）
  // 于是他立刻给你的 Promise 手动挂上 .then
  i.done ? t(u) : Promise.resolve(u).then(r, o);
  ```
- **工作机制**：当你的异步任务（如 `getUserInfo`）完成时，监工预留的 `.then` 回调会被触发。这个回调会去手动点一下“播放键”（调用 `_next`），从而驱动状态机进入下一个 `case`。

## 总结
1. **代码转换**：函数被拆分为状态机。
2. **作用域平铺**：局部变量提升至闭包以保留状态。
3. **异步驱动**：利用监工（执行器）中的 Promise 微任务回调重新唤醒迭代器。
