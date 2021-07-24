import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { useAuthContext } from '../Users';
import '../styles/First.css';

export default function First() {
  const { currentUser, logout } = useAuthContext();

  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <div className="page">
        <div className="page-box">
          <h2>고독한 독서</h2>
          {currentUser ? (
            <>
              <h2>{currentUser.displayName}</h2>
              <img className="profile" src={currentUser.photoURL} alt="프로필이미지" />
            </>
          ) : (
            <Login />
          )}

          <div className="first-button-set">
            {currentUser ? (
              <>
                <Link to="/" onClick={handleLogOut}>
                  로그아웃
                </Link>
                <span>|</span>
                <Link to="/main">독서</Link>
              </>
            ) : (
              <Link to="/main">게스트</Link>
            )}
            <span>|</span>
            <Link to="/signup">회원가입</Link>
            <span>|</span>
            <Link to="/custom">커스텀</Link>
          </div>
        </div>
      </div>
      )
    </>
  );
}
