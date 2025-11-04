/* =============================================================== 平铺数据 转 树 =============================================================== */
function tree(params) {
  const deleteArr = [];
  params.forEach((e) => {
    const { pid, id } = e;
    const parentInd = params.findIndex((c) => c.id === pid);

    if (parentInd > -1) {
      deleteArr.push(id);
      if (params[parentInd].children) {
        params[parentInd].children.push(e);
      } else {
        params[parentInd].children = [e];
      }
    }
  });

  deleteArr.forEach((e) => {
    const ind = params.findIndex((c) => c.id === e);
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

function twoSum(nums, target) {
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
}

// console.log(twoSum([3, 2, 4, 10], 13));

/* =============================================================== 无重复字符的最长子串 =============================================================== */
/**
 * @param {string} str_root
 * @return {number}
 */
function lengthOfLongestSubstring(str_root) {
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
}
// console.log(lengthOfLongestSubstring(dvdf));

/* =============================================================== 寻找两个正序数组的中位数 =============================================================== */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  const newArr = [...nums1, ...nums2].sort((a, b) => a - b);
  const middle = newArr.length / 2;

  if (~`${middle}`.indexOf(".")) {
    return newArr[Math.ceil(middle) - 1];
  } else {
    return (newArr[middle - 1] + newArr[middle]) / 2;
  }
}

console.log(findMedianSortedArrays([1, 1], [1, 2]));

/* =============================================================== 寻找两个正序数组的中位数 =============================================================== */

// 题目解释
// 1. 分数相同的时候名次相同.
// 2. 当出现相同分数的情况下, 名次并不连续. 既排名在两个并列第一之后的学生名次是第三, 排名在三个并列第一之后的学生名次是第四.
// 3. 输出示例(不需要考虑输出顺序):
// 4. 后续我再提一些变动条件，你根据新的变化，重新提交代码，比如按全年级排名，名次可以连续....
const testScore = (obj) => {
  const scoreArr = [];
  Object.keys(obj).forEach((className) => {
    const classObj = obj[className];
    Object.keys(classObj).forEach((studentName) => {
      scoreArr.push({
        name: studentName,
        score: classObj[studentName],
        class: className,
      });
    });
  });

  // 手动排序 - 插入排序（从高到低）
  for (let i = 1; i < scoreArr.length; i++) {
    const current = scoreArr[i];
    let j = i - 1;
    
    while (j >= 0 && scoreArr[j].score < current.score) {
      scoreArr[j + 1] = scoreArr[j];
      j--;
    }
    
    scoreArr[j + 1] = current;
  }

  let rank = 1;
  let lastScore = null;
  scoreArr.forEach((e, i) => {
    if (i === 0) {
      e.rank = rank;
      lastScore = e.score;
      return;
    }

    if (e.score === lastScore) {
      e.rank = rank;
    } else {
      rank = i + 1;
      e.rank = rank;
      lastScore = e.score;
    }
  });

  console.log(scoreArr);
};

testScore({
  一班: {
    张小丙: 87,
    张小甲: 98,
    张小乙: 90,
  },
  二班: {
    王七六: 76,
    王九七: 97,
    胡八一: 81,
    王六零: 60,
    刘八一: 81,
    李八一: 81,
  },
});
