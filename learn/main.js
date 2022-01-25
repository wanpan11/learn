// console.log("module main.js start", a, b, "引入结束");
// import a from "./test-demo/10_module_a.js";
// import b from "./test-demo/10_module_b.js";

// import "./test-demo/01_原型.js";
// import './test-demo/02_定时器.js';
// import "./test-demo/03_async、await.js";
// import './test-demo/04_json.js';
// import "./test-demo/05_new.js";
// import "./test-demo/09_链表.js";
// import './test-demo/11_eventLoop.js';
// import './test-demo/12_jsonp.js';
// import "./test-demo/13_forEach.js";
// import "./test-demo/14_requestAnimationFrame.js";
// import "./test-demo/15_算法.js";
// import "./test-demo/16_call、apply.js";
import "./test-demo/17_表达式.js";

/* ============================================================================= */

/**
 * 循环引用问题
 * main 引用 loopRequire loopRequire 引用 main
 * loopRequire 中使用了 main 导出的方法 可能会造成 无法访问 （具体细节 Google）
 *
 */
// import { loopRequire } from "./loopRequire.js";

// console.log("main file");

// console.log(loopRequire());

// const main = () => {
//   return "====== main";
// };

// export { main };
