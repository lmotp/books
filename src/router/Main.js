import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Users';

const Main = () => {
  const { logout } = useAuthContext();

  const handleLogOut = () => {
    logout();
  };
  return (
    <>
      <Link to="/signup">
        <button>회원가입하러가기 </button>
      </Link>
      <button onClick={handleLogOut}>로그아웃</button>
    </>
  );
};

export default Main;
