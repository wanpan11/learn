import { makeAutoObservable /* autorun */ } from "mobx";

class Todo {
  constructor() {
    makeAutoObservable(this);
  }

  list = [];
  count = { name: "count", num: 0 };

  addTodo(msg) {
    this.list.push({ msg });
    // this.count.num += 1;
  }

  get report() {
    return this.list;
  }
}

const todoStore = new Todo();

// autorun(() => {
//   console.log("autorun ===> ", todoStore.report.length);
// });

export default todoStore;
