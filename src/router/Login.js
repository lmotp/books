import React, { useRef, useState } from 'react';
import { useAuthContext } from '../Users';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to Log in');
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Log in</h2>
      <div>{error}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input type="email" ref={emailRef} id="email" required></input>
        </label>
        <label htmlFor="current-password">
          Password
          <input type="password" ref={passwordRef} id="current-password" required autoComplete="on"></input>
        </label>
        <button disabled={loading} type="submit">
          Log in
        </button>
      </form>

      <div>
        Need an account?<Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
