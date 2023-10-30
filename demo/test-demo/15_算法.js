/* =============================================================== 平铺数据 转 树 =============================================================== */
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

// 引用地址
tree([
  { id: 300, name: "部门1" },
  { id: 3000, name: "部门1", pid: 300 },
  { id: 30000, name: "部门1", pid: 3000 },

  { id: 20, name: "部门1" },
  { id: 200, name: "部门1", pid: 20 },

  { id: 1, name: "部门1" },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
]);

/* =============================================================== 两数之和 =============================================================== */
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

// console.log(twoSum([3, 2, 4, 10], 13));

/* =============================================================== 无重复字符的最长子串 =============================================================== */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (str_root) {
  const strArr = [];

  let arr = [];
  let ind = 0;
  let str = "";

  while (ind < str_root.length) {
    const existence = ~arr.indexOf(str_root[ind]);

    if (existence) {
      strArr.push(str);
      const start = str_root.indexOf(str_root[ind]);
      str_root = str_root.slice(start + 1);
      str = "";
      arr = [];
      ind = 0;
    } else {
      arr.push(str_root[ind]);
      str = str + str_root[ind];
      ind += 1;
    }
  }

  strArr.push(str);

  let len = 0;
  strArr.forEach((e, i) => {
    if (i === 0) {
      len = e.length;
      return;
    }

    if (e.length > len) {
      len = e.length;
    }
  });

  return len;
};
// console.log(lengthOfLongestSubstring(dvdf));

/* =============================================================== 寻找两个正序数组的中位数 =============================================================== */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const newArr = [...nums1, ...nums2].sort((a, b) => a - b);
  const middle = newArr.length / 2;

  if (~`${middle}`.indexOf(".")) {
    return newArr[Math.ceil(middle) - 1];
  } else {
    return (newArr[middle - 1] + newArr[middle]) / 2;
  }
};

console.log(findMedianSortedArrays([1, 1], [1, 2]));
