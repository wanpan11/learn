import React from 'react';
import Function from './funtion';
import Class from './class';


class App extends React.Component {
  state = {
    user: '张三',
  };

  render() {
    return (
      <>
        <label>
          <b>选择用户首页: </b>
          <select
            value={this.state.user}
            onChange={(e) => this.setState({ user: e.target.value })}
          >
            <option value='张三'>张三</option>
            <option value='李四'>李四</option>
            <option value='王文英'>王文英</option>
          </select>
        </label>

        <h1>欢迎来到 {this.state.user}的个人主页!</h1>

        <p>
          <Function user={this.state.user} />
          <b>(function)</b>
        </p>

        <p>
          <Class user={this.state.user} />
          <b>(class)</b>
        </p>

        <p>Can you spot the difference in the behavior?</p>
      </>
    );
  }
}

export default App;
