// 原始对象
const obj = [
  {
    a: '1',

    obj_1: {
      b: '2',

      obj_2: {
        c: '3',
      },
    },
  },
]

function fun(obj) {
  let data = {}

  // obj
  /*   obj.map(e => {
    data = e.obj_1;
  }); */

  // 数组
  data = obj.map((e) => {
    return e.obj_1
  })

  return data
}

const data = fun(obj)

// 修改新对象引用值
data[0].obj_2 = 20
// data.obj_2 = 20;

console.log('obj >>>', obj)
console.log('data >>>', data)
