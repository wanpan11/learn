/* ==============  Object.defineProperty(  ================ */
let value = 0;
const obj = {
  name: 1,
};

Object.defineProperty(obj, "name", {
  get() {
    return value;
  },

  set(val) {
    value = val;
  },
});

console.log(obj.name);
console.log((obj.name = 10));

console.log(obj);

/* ==============  Proxy  ================ */
// const obj = {
//   name: "wanpan",
//   age: 25,
// };

// const handler = {
//   get: function (obj, prop) {
//     return prop in obj ? obj[prop] : 37;
//   },
// };

// const p = new Proxy(obj, handler);

// p.name;
