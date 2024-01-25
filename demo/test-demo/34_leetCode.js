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

// 2. 两数之和

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var addTwoNumbers = function (l1, l2) {
  const head = new ListNode(0);

  let curr = head;
  let next = true;
  let add = 0;

  while (next) {
    const val_1 = l1?.val || 0;
    const val_2 = l2?.val || 0;

    const num = val_1 + val_2 + add;

    if (num > 9) {
      add = 1;
    } else {
      add = 0;
    }

    const node = new ListNode(num % 10);
    curr.next = node;
    curr = node;
    next = false;

    if (l1?.next) {
      l1 = l1.next;
      next = true;
    } else {
      l1 = null;
    }

    if (l2?.next) {
      l2 = l2.next;
      next = true;
    } else {
      l2 = null;
    }
  }

  if (add === 1) {
    curr.next = new ListNode(add);
  }

  return head.next;
};
addTwoNumbers(new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(5, new ListNode(6, new ListNode(4))));

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
