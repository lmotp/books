import React, { memo } from 'react';
import { useAuthContext } from '../Users';
import { storage } from '../firebase';
import { Link } from 'react-router-dom';

const Custom = () => {
  const { currentUser, imageSrc, onFileChange, setImageSrc, filename, setBackground, background, clearImageSrc } =
    useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    const fileRef = storage.ref().child(`${currentUser.displayName}/custom/${filename}`);
    await (await fileRef.putString(imageSrc, 'data_url')).ref.getDownloadURL();
    setBackground(await (await fileRef.putString(imageSrc, 'data_url')).ref.getDownloadURL());
    setImageSrc('');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="file" onChange={onFileChange(setImageSrc)}></input>
        {imageSrc && <img src={imageSrc} alt="배경화면" width="20%" height="20%" />}
        <button>등록</button>
        <button onClick={clearImageSrc(setImageSrc)}>취소</button>
      </form>
      {background && <img src={background} alt="배경화면1" />}
      <Link to="/">
        <button>메인으로!</button>
      </Link>
    </>
  );
};

export default memo(Custom);
