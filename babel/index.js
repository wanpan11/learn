"use strict";

var a = function a() {};

a();
var obj = {
  a: 1,
};
console.log(obj === null || obj === void 0 ? void 0 : obj.a);
console.log(obj === null || obj === void 0 ? void 0 : obj.b);
