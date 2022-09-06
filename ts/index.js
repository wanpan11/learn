// "use strict";
const a = 1;
function print(arg) {
  console.log(arg);
  console.log(arguments.callee);
  return arg;
}
const wanpan = print("123");
