import { observer } from "mobx-react";
import todoStore from "./store";

function Button() {
  console.log("render ===> Button");

  const click = () => {
    todoStore.addTodo("当前任务" + new Date().getTime());
  };

  return <button onClick={click}>点我新增啦啦啦</button>;
}
/* ============================= */

function ListComp({ list }) {
  console.log("render ===> ListComp");

  return list.map(e => <div key={e.msg}> {e.msg} </div>);
}
const List = observer(ListComp);
/* ============================= */

function CountComp({ count }) {
  console.log("render ===> CountComp");

  return <div>count:{count.num} </div>;
}
const Count = observer(CountComp);
/* ============================= */

function Todo() {
  console.log("render ===> TodoList");

  return (
    <div>
      <Button />
      <List list={todoStore.list} />
      <Count count={todoStore.count} />
    </div>
  );
}
/* ============================= */

export default function App() {
  return <Todo />;
}
