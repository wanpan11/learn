// 1. 两数之和
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const length = nums.length;
  let arr = [];

  nums.some((item, idx) => {
    for (let i = idx + 1; i < length; i++) {
      if (item + nums[i] === target) {
        arr[0] = idx;
        arr[1] = i;
        break;
      }
    }

    return !!arr.length;
  });

  return arr;
};

twoSum([3, 2, 4], 6);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root) {
  let count = 0;
  const step = 2;

  root.forEach((element, idx) => {
    if (element > root[0]) {
      count++;
    }
    if (element.length > step) {
      goodNodes(element);
    }
  });

  return count;
};
