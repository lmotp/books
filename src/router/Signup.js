import React, { useRef, useState } from 'react';
import { useAuthContext } from '../Users';
import { Link, useHistory } from 'react-router-dom';
import { storage } from '../firebase';
import '../styles/Signup.css';

export default function Signup() {
  const passWordConfirmRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();

  const { signup, changeDisplayName, onFileChange, imageSrc, setImageSrc, clearImageSrc } = useAuthContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passWordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      const photoUrl = await (
        await storage.ref().child(`profile/${displayNameRef.current.value}`).putString(imageSrc, 'data_url')
      ).ref.getDownloadURL();
      await changeDisplayName(displayNameRef.current.value, photoUrl);

      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
    setImageSrc('');
  };

  return (
    <div className="page signup">
      <div className="page-box">
        <h2>회원가입</h2>
        <div>{error}</div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">아이디</label>
            <input type="email" ref={emailRef} id="email" required autoComplete="off" autoFocus></input>

            <label htmlFor="displayName">닉네임</label>
            <input type="text" ref={displayNameRef} id="displayName" required autoComplete="off"></input>

            <label htmlFor="password">비밀번호</label>
            <input type="password" ref={passwordRef} id="password" required autoComplete="off"></input>

            <label htmlFor="password-confirm">비밀번호 재확인</label>
            <input type="password" ref={passWordConfirmRef} id="password-confirm" required autoComplete="off"></input>

            <label>프로필사진</label>
            <input className="profile" type="file" onChange={onFileChange(setImageSrc)} accept="image/*"></input>

            {imageSrc && (
              <p>
                <img src={imageSrc} alt="profileImage" width="100px" height="100px" />
                <button onClick={clearImageSrc(setImageSrc)}>Clear</button>
              </p>
            )}
            <button disabled={loading} type="submit">
              Sign up
            </button>
          </form>
        </div>

        <span>
          이미 회원가입을 했다면?<Link to="/">로그인</Link>
        </span>
      </div>
    </div>
  );
}
