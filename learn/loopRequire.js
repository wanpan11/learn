import { main } from "./main.js";

console.log("loopRequire file");

console.log(main());

export function loopRequire() {
  return "==== loopRequire";
}
