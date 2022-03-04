import React from 'react';

class ProfilePage extends React.Component {
  showMessage = () => {
    alert('你关注了 ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    console.log('Class reload');

    return <button onClick={this.handleClick}>关注</button>;
  }
}

export default ProfilePage;
