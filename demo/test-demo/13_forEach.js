/* ================================= 指针问题 =========================================== */
let data = [{ a: 1 }, { b: 2 }, { c: 3 }];
const arr = [888];
const newArr = [];

// data.forEach((el_root, ind_root) => {
//   //   el_root = 9999;
//   arr.forEach(el => {
//     console.log(el_root);
//     el_root = el;
//     newArr.push(el_root);
//     console.log(el_root);
//   });
// });
// console.log(data);

/* ================================= 深度遍历查找 =========================================== */
const testTree = {
  value: "A",
  children: [
    {
      value: "B",
      children: [
        {
          value: "D",
          children: [
            {
              value: "H",
              children: [],
            },
          ],
        },
        {
          value: "E",
          children: [],
        },
      ],
    },
    {
      value: "C",
      children: [
        {
          value: "F",
          children: [],
        },
        {
          value: "G",
          children: [],
        },
      ],
    },
  ],
};
/**
 * 深度遍历查找
 * @param {*} tree 树形数据
 * @param {*} target 想要查找的目标
 */
function DFS(tree, target) {
  // 模拟栈，管理结点
  let stack = [tree];

  while (stack.length) {
    // 栈顶节点出栈
    let node = stack.pop();

    // 查找到目标，退出
    if (node.value === target) {
      return node;
    }

    if (node.children && node.children.length) {
      // 将候选顶点入栈，进行下一次循环
      stack.push(...node.children.reverse());
    }
  }
}
// console.log(DFS(testTree, "G"));

/* =============================== 冒泡排序 ============================================= */
const sortArr = [8, 4, 1, 3, 5, 2];
/**
 * 冒泡排序 尾排序
 * @param {*} arr 需要排序的数组
 */
function BubbleSort(arr) {
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let c = 0; c < arr.length - i; c++) {
      if (arr[c] > arr[c + 1]) {
        temp = arr[c];
        arr[c] = arr[c + 1];
        arr[c + 1] = temp;
      }
    }
  }
}
// BubbleSort(sortArr);

/* ============================================================================ */
// 选择排序
const selectionSort = arr => {
  if (arr.length <= 1) return;
  // 需要注意这里的边界, 因为需要在内层进行 i+1后的循环，所以外层需要 数组长度-1

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // 将小值赋值给 当前索引
      }
    }

    console.log("minIndex ===> ", minIndex);
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    console.log("arr ===> ", arr.toString());
  }
  console.log(arr);
};
// selectionSort(sortArr);

/* ============================================================================ */

function sort(params) {
  params.forEach((_, i) => {
    let currentMinIndex = i;

    for (let index = i + 1; index < params.length; index++) {
      if (params[index] < params[currentMinIndex]) {
        currentMinIndex = index;
      }
    }

    const temp = params[currentMinIndex];
    params[currentMinIndex] = params[i];
    params[i] = temp;
  });

  return params;
}

console.log("sort(sortArr) ===> ", sort(sortArr));
