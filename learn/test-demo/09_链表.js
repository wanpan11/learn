//创建链表
function CreateLinkNode(data, pre, next) {
  this.data = data;
  this.preNode = pre;
  if (this.preNode) {
    pre.nextNode = this;
  }
  this.nextNode = next;
}

CreateLinkNode.prototype.print = function () {
  if (this.nextNode) {
    return this.data.name + this.nextNode.print();
  } else {
    return this.data.name;
  }
};

// 在当前调用节点右边 插入新节点
CreateLinkNode.prototype.insertNode = function (node) {
  // 如果当前节点不是最后一个节点
  if (this.nextNode && this.nextNode.preNode) {
    this.nextNode.preNode = node;
  }

  node.nextNode = this.nextNode;

  node.preNode = this;
  this.nextNode = node;
};

//删除某一个节点
CreateLinkNode.prototype.removeNode = function () {
  this.nextNode.preNode = this.preNode;
  this.preNode.nextNode = this.nextNode;
};

//反序链表
CreateLinkNode.prototype.revertNode = function () {
  var tmp = null; //{nextNode: null, preNode: null};
  function revert() {
    if (!this.nextNode) {
      this.preNode = null;
      this.nextNode = tmp;
      return this;
    } else {
      this.preNode = this.nextNode;
      this.nextNode = tmp;
      tmp = this;
      return revert.call(this.preNode);
    }
  }

  return revert.call(this);
};

var ln1 = new CreateLinkNode({ name: '1' }, null, null);
var ln2 = new CreateLinkNode({ name: '2' }, ln1, null);
var ln3 = new CreateLinkNode({ name: '3' }, ln2, null);
var ln4 = new CreateLinkNode({ name: '4' }, ln3, null);
var ln5 = new CreateLinkNode({ name: '5' }, null, null);

var lHead = ln1;

console.log(ln1);

ln4.insertNode(ln5);

console.log(lHead.print()); //12345

ln3.removeNode();
console.log(lHead.print()); // 1245
ln2.insertNode(ln3);
console.log(lHead.print()); // 12345
lHead = lHead.revertNode();
console.log(lHead.print()); // 54321
