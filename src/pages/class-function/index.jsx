import React from 'react';
import Function from './funtion';
import Ref from './funtion-ref';
import Class from './class';

class ClassOrFun extends React.Component {
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
            onChange={e => this.setState({ user: e.target.value })}
          >
            <option value="张三">张三</option>
            <option value="李四">李四</option>
            <option value="王文英">王文英</option>
          </select>
        </label>

        <div
          title={`欢迎来到 ${this.state.user}的个人主页!`}
          style={{
            maxWidth: 360,
            boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)',
            marginTop: '10px',
          }}
        >
          <p>
            <Function user={this.state.user} />
            (function)
          </p>

          <p>
            <Class user={this.state.user} />
            (class)
          </p>

          <p>
            <Ref user={this.state.user} />
            (Ref)
          </p>
        </div>

        <p>为什么会出现这中情况?</p>
      </>
    );
  }
}

export default ClassOrFun;
