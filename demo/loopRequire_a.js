/* 进入 b模块执行 加入缓存 */
import { b } from "./loopRequire_b.js";

console.log("a file");
console.log("b ===> ", b);

const a = 1;

function a_fun(params) {}

export { a, a_fun };
