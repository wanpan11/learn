// 平铺数据 转 树
let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function tree(params) {
  let deleteArr = [];
  params.forEach(e => {
    const { pid, id } = e;
    let parentInd = params.findIndex(c => c.id === pid);

    if (parentInd > -1) {
      deleteArr.push(id);
      if (params[parentInd].children) {
        params[parentInd].children.push(e);
      } else {
        params[parentInd].children = [e];
      }
    }
  });

  deleteArr.forEach(e => {
    const ind = params.findIndex(c => c.id === e);
    if (ind > -1) {
      params.splice(ind, 1);
    }
  });

  console.log(params);
}

// tree(arr);

/* =============================== */

// 两数之和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// const twoSum = function (nums, target) {
//   let ind_1 = 0;
//   let ind_2 = ind_1 + 1;

//   let arr = [];
//   const len = nums.length;

//   while (arr.length === 0) {
//     let val = nums[ind_1] + nums[ind_2];

//     if (val === target) {
//       arr = [ind_1, ind_2];
//     }

//     if (ind_2 === len) {
//       ind_1 += 1;
//       ind_2 = ind_1 + 1;
//     } else {
//       ind_2 += 1;
//     }
//   }

//   return arr;
// };

const twoSum = function (nums, target) {
  let ind = 0;

  const map = {};
  const len = nums.length;

  while (ind < len) {
    const val = target - nums[ind];
    const v = map[val];

    if (v !== undefined && v !== null) {
      if (ind > v) {
        return [v, ind];
      } else {
        return [ind, v];
      }
    } else {
      map[nums[ind]] = ind;
      ind += 1;
    }
  }
};
const nums = [3, 2, 4, 10];
const target = 13;
console.log(twoSum(nums, target));
