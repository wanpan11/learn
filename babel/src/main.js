import { event } from "./event";
import { dom } from "./dom";
import request from "@tripmini/caas-request";
import wx, { wxObj } from "./wx.js";

const main = () => {
  console.log("wanpan ===> ");
};

console.log("request ===> ", request);
console.log("wx ===> ", wx);
console.log("wxObj ===> ", wxObj);
main();
event();
dom();
