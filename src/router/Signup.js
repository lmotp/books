import React, { useRef, useState } from 'react';
import { useAuthContext } from '../Users';
import { Link, useHistory } from 'react-router-dom';
import { storage } from '../firebase';

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
      await changeDisplayName(displayNameRef.current.value);
      await storage.ref().child(`profile/${displayNameRef.current.value}`).putString(imageSrc, 'data_url');
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
    setImageSrc('');
  };

  return (
    <>
      <h2>Sign up</h2>
      <div>{error}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input type="email" ref={emailRef} id="email" required></input>
        </label>
        <label htmlFor="displayName">
          displayName
          <input type="text" ref={displayNameRef} id="displayName" required></input>
        </label>
        <label htmlFor="password">
          Password
          <input type="password" ref={passwordRef} id="password" required autoComplete="on"></input>
        </label>
        <label htmlFor="password-confirm">
          Password Confirmation
          <input type="password" ref={passWordConfirmRef} id="password-confirm" required autoComplete="on"></input>
        </label>
        <label>
          profileImage
          <input type="file" onChange={onFileChange} accept="image/*"></input>
        </label>
        {imageSrc && (
          <>
            <img src={imageSrc} alt="profileImage" width="100px" height="100px" />
            <button onClick={clearImageSrc}>Clear</button>
          </>
        )}
        <button disabled={loading} type="submit">
          Sign up
        </button>
      </form>

      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
