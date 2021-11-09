import React from 'react';

function ProfilePage(props) {
  const showMessage = () => {
    alert('你关注了 ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>关注</button>;
}

export default ProfilePage;
