import { useRef, useEffect } from 'react';

function ProfilePage(props) {
  //
  const ref = useRef();

  const showMessage = () => {
    alert('你关注了 ' + ref.current.name);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
    ref.current = { name: '小黄' };
  };

  useEffect(() => {
    ref.current = { name: props.user };
  }, [props.user]);

  return <button onClick={handleClick}>关注</button>;
}

export default ProfilePage;
