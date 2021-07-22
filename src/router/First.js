import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { useAuthContext } from '../Users';
import { storage } from '../firebase';
import Loading from '../components/Loading';
import '../styles/First.css';

export default function First() {
  const { currentUser, logout } = useAuthContext();
  const [profile, setProfile] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogOut = () => {
    logout();
  };
  useEffect(() => {
    if (currentUser) {
      storage
        .ref(`profile/${currentUser.displayName}`)
        .getDownloadURL()
        .then((rep) => setProfile(rep));
    }
    setIsLoading(false);
  }, [currentUser, setProfile, isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="page">
          <div className="page-box">
            <h2>고독한 독서</h2>
            {currentUser ? (
              <>
                <h2>{currentUser.displayName}</h2>
                <img className="profile" src={profile} alt="프로필이미지" />
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
      )}
    </>
  );
}
