import { useState } from 'react';

function ProfilePage(props) {
  const [user] = useState(() => {
    // hook 初始值置灰执行一次
    return props.user;
  });

  console.log('reload', user);

  const showMessage = () => {
    alert('你关注了 ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>关注</button>;
}

export default ProfilePage;
