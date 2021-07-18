import React, { memo } from 'react';
import { useAuthContext } from '../Users';
import { storage } from '../firebase';

const Background = () => {
  const { currentUser, immageSrc, onFileChange } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    const image = await storage.ref().child(`${currentUser.displayName}`).putString(immageSrc, 'data_URL');
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={onFileChange}></input>
        <button>보내기</button>
      </form>
    </>
  );
};

export default memo(Background);
