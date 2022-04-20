/* ================================= 指针问题 =========================================== */
let data = [{ a: 1 }, { b: 2 }, { c: 3 }];
const arr = [888];
const newArr = [];

data.forEach((el_root, ind_root) => {
  //   el_root = 9999;
  arr.forEach(el => {
    console.log(el_root);
    el_root = el;
    newArr.push(el_root);
    console.log(el_root);
  });
});
// console.log(data);

/* ================================= 深度遍历查找 =========================================== */
const testArr = {
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
// console.log(DFS(testArr, "G"));

/* =============================== 冒泡排序 ============================================= */
const sortArr = [10, 20, 12, 40, 22, 88];
/**
 * 冒泡排序
 * @param {*} arr 需要排序的数组
 */
function BubbleSort(arr) {
  let temp;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let c = 0; c < arr.length - i; c++) {
      debugger;
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
