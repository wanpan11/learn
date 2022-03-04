import { useState } from 'react';

function ProfilePage(props) {
  const initData = () => {
    // hook 传入函数后 只会调用一次
    console.log('hook init');
    return props.user;
  };

  // const [,] = useState(initData()); // 不需要 手动调用 不然会多次调用该函数
  const [,] = useState(initData);

  console.log('fun reload');

  const showMessage = () => {
    alert('你关注了 ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>关注</button>;
}

export default ProfilePage;
