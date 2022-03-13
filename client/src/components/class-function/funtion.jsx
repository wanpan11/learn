function ProfilePage(props) {
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
