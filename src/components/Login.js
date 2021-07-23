import React, { useRef, useState } from 'react';
import { useAuthContext } from '../Users';
import { useHistory } from 'react-router-dom';

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
      history.push('/main');
    } catch {
      setError('Failed to Log in');
    }
    setLoading(false);
  };

  return (
    <div className="login-form">
      <div>{error}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input type="email" ref={emailRef} id="email" required autoComplete="off" placeholder="id" autoFocus></input>
        </label>
        <label htmlFor="current-password">
          <input
            type="password"
            ref={passwordRef}
            id="current-password"
            required
            autoComplete="off"
            placeholder="password"
          ></input>
        </label>
        <button disabled={loading} type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
