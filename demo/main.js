/* =========================== import =========================== */
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
// import "./test-demo/17_表达式.js";
// import "./test-demo/18_尾调用.js";
// import * as wanpan from "./test-demo/19_esm_index.js";
// import "./test-demo/20_引用对象.js";
// import "./test-demo/21_扩展运算符.js";
// import "./test-demo/22_proxy.js";
// import "./test-demo/23_隐式转换.js";
// import "./test-demo/24_webComponents.js";
// import "./test-demo/25_标签模板字符串.js";

/* =========================== 测试代码 =========================== */
// console.log(wanpan);

/* =========================== 循环引用问题 =========================== */
/* esmodule 引入逻辑 子>父 */
// console.log("module main.js start", a, b, "引入结束");
// import a from "./test-demo/10_module_a.js";
// import b from "./test-demo/10_module_b.js";

/**
 * 循环引用问题
 * main 引用 loopRequire loopRequire 引用 main
 * loopRequire 中使用了 main 导出的方法 可能会造成 无法访问 （具体细节 Google）
 * esMoudle 导入的是实际引用值 基础数据类型 不可修改 引用数据类型 不能直接复制修改
 */

/* 进入 a模块执行 加入缓存 */
import { a } from "./loopRequire_a.js";
console.log("main file");
