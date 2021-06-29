import React, { useState } from 'react';

const Login = () => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  console.log(value);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={value}></input>
      </form>
    </>
  );
};

export default Login;
