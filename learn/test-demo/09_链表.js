//创建链表
// function CreateLinkNode(data, pre, next) {
//   this.data = data;
//   this.preNode = pre;
//   if (this.preNode) {
//     pre.nextNode = this;
//   }
//   this.nextNode = next;
// }

// CreateLinkNode.prototype.print = function () {
//   if (this.nextNode) {
//     return this.data.name + this.nextNode.print();
//   } else {
//     return this.data.name;
//   }
// };

// // 在当前调用节点右边 插入新节点
// CreateLinkNode.prototype.insertNode = function (node) {
//   // 如果当前节点不是最后一个节点
//   if (this.nextNode && this.nextNode.preNode) {
//     this.nextNode.preNode = node;
//   }

//   node.nextNode = this.nextNode;

//   node.preNode = this;
//   this.nextNode = node;
// };

// //删除某一个节点
// CreateLinkNode.prototype.removeNode = function () {
//   this.nextNode.preNode = this.preNode;
//   this.preNode.nextNode = this.nextNode;
// };

// //反序链表
// CreateLinkNode.prototype.revertNode = function () {
//   var tmp = null; //{nextNode: null, preNode: null};
//   function revert() {
//     if (!this.nextNode) {
//       this.preNode = null;
//       this.nextNode = tmp;
//       return this;
//     } else {
//       this.preNode = this.nextNode;
//       this.nextNode = tmp;
//       tmp = this;
//       return revert.call(this.preNode);
//     }
//   }

//   return revert.call(this);
// };

// var ln1 = new CreateLinkNode({ name: "1" }, null, null);
// var ln2 = new CreateLinkNode({ name: "2" }, ln1, null);
// var ln3 = new CreateLinkNode({ name: "3" }, ln2, null);
// var ln4 = new CreateLinkNode({ name: "4" }, ln3, null);
// var ln5 = new CreateLinkNode({ name: "5" }, null, null);

// var lHead = ln1;

// console.log(ln1);

// ln4.insertNode(ln5);

// console.log(lHead.print()); //12345

// ln3.removeNode();
// console.log(lHead.print()); // 1245
// ln2.insertNode(ln3);
// console.log(lHead.print()); // 12345
// lHead = lHead.revertNode();
// console.log(lHead.print()); // 54321

// 手写
function LinkForm(name, previous) {
  this.name = name;
  this.preNode = previous;
  this.nextNode = null;

  if (previous) {
    previous.nextNode = this;
  }
}

LinkForm.prototype.insertNode = function (newNode) {
  const { preNode } = this; // 上一个节点

  if (this.preNode) {
    preNode.nextNode = newNode;
    this.preNode = newNode;
    newNode.nextNode = this;
    newNode.preNode = preNode;
  } else {
    this.preNode = newNode;
    newNode.nextNode = this;
  }
};

const link_1 = new LinkForm("link_1", null);
const link_2 = new LinkForm("link_2", link_1);
const link_3 = new LinkForm("link_3", link_2);
const link_4 = new LinkForm("link_4", link_3);
const link_5 = new LinkForm("link_5", link_4);

const link_6 = new LinkForm("link_6", null);

// link_5.insertNode(link_6);
link_1.insertNode(link_6);

console.log(link_6);
