import React, { useRef, useEffect } from 'react';

function ProfilePage(props) {
  //
  const ref = useRef();

  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    console.log(ref);
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>关注</button>;
}

export default ProfilePage;
