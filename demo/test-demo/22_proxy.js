/* ==============  Object.defineProperty(  ================ */
// let value = 0;
// const obj = {
//   name: 1,
// };

// Object.defineProperty(obj, "name", {
//   get() {
//     return value;
//   },

//   set(val) {
//     value = val;
//   },
// });

// console.log(obj.name);
// console.log((obj.name = 10));

// console.log(obj);

/* ==============  Proxy  ================ */
// const obj = {
//   name: "wanpan",
//   age: 25,
// };

const arr = [1, 2, 3, 4];

const handler = {
  get: function (target, key, receiver) {
    console.log("get的key为 ===>", target, key, receiver);
    console.log(Reflect.get(target, key, receiver));
    return Reflect.get(target, key, receiver);
  },

  set(target, key, value, receiver) {
    console.log("set的key为 ===>" + key, value);
    console.log(Reflect.set(target, key, value, receiver));
    return Reflect.set(target, key, value, receiver);
  },
};

// const obj_1 = new Proxy(obj, handler);
const arr_1 = new Proxy(arr, handler);

// console.log("obj_1.name ===> ", obj_1.name);
// console.log("arr_1[1] ===> ", arr_1[1]);

arr_1.push(10);
