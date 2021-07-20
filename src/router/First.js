import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import '../styles/First.css';

export default function First() {
  return (
    <div className="page">
      <div className="page-box">
        <Login />
        <div className="first-button-set">
          <Link to="/main">게스트</Link>
          <span>|</span>
          <Link to="/signup">회원가입</Link>
          <span>|</span>
          <Link to="/custom">커스텀</Link>
        </div>
      </div>
    </div>
  );
}
