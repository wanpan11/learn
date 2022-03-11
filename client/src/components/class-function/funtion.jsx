import { /* useEffect */ useState /* useLayoutEffect */ } from 'react';

// let num = 0;

function ProfilePage(props) {
  // const [,] = useState(initData()); // 不需要 手动调用 不然会多次调用该函数
  const [,/* setData */] = useState(initData);
  function initData() {
    return props.user;
  }

  // useEffect(() => {
  //   console.log("useEffect >>");
  // });

  // useLayoutEffect(() => {
  //   console.log("useLayoutEffect >>");

  //   if (num < 10) {
  //     num++;
  //     setData(Math.random());
  //   }
  // });

  const showMessage = () => {
    alert('你关注了 ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  console.log('fun reload');

  return <button onClick={handleClick}> 关注</button>;
}

export default ProfilePage;
