import React, { useRef, useState } from 'react';
import { useAuthContext } from '../Users';
import { Link, useHistory } from 'react-router-dom';

export default function Signup() {
  const passWordConfirmRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuthContext();
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
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
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
        <label htmlFor="password">
          Password
          <input type="password" ref={passwordRef} id="password" required></input>
        </label>
        <label htmlFor="password-confirm">
          Password Confirmation
          <input type="password" ref={passWordConfirmRef} id="password-confirm" required></input>
        </label>
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
