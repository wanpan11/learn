import React from "react";

class Item extends React.Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" />
        </div>
      </div>
    );
  }
}

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [
        { name: "听风是风", id: 1 },
        { name: "行星飞行", id: 2 },
      ],
    };
  }

  addItem = () => {
    const id = +new Date();
    this.setState({
      list: [{ name: "时间跳跃" + id + id, id }, ...this.state.list],
    });
  };

  render() {
    return (
      <div className="example">
        <button onClick={this.addItem}>click me</button>

        <div className="form">
          <form>
            <h3>
              不好的做法 <code>key=index</code>
            </h3>

            {this.state.list.map((todo, index) => (
              <Item {...todo} key={index} />
            ))}
          </form>

          <form>
            <h3>
              更好的做法 <code>key=id</code>
            </h3>

            {this.state.list.map(todo => (
              <Item {...todo} key={todo.id} />
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default Example;
