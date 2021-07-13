import React from 'react';
import { Link } from 'react-router-dom';

export default function First() {
  return (
    <>
      <Link to="/main">
        <button>게스트로 독서하러가기</button>
      </Link>
      <Link to="/login">
        <button>로그인</button>
      </Link>
      <Link to="/signup">
        <button>회원가입하러가기</button>
      </Link>
    </>
  );
}
