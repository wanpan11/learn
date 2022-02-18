import { main } from "./main.js";

console.log("loopRequire file");
// console.log(main());

export const a = 1;
export let b = {
  b1: 2,
};

setTimeout(() => {
  console.log(b.b1);
}, 1000);

export function loopRequire() {
  return "==== loopRequire";
}
