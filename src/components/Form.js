import React, { useState } from 'react';
import { firestore } from '../firebase';
import { useAuthContext } from '../Users';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
export default function Form() {
  const [value, setValue] = useState('');
  const { currentUser, onFileChange, imageSrc, setImageSrc, clearImageSrc } = useAuthContext();

  // 메모장기능
  const changeValue = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  const currentUserUid = async (currentUserUid) => {
    let fileURL;
    if (currentUserUid !== 'gest' && imageSrc !== '') {
      const fileRef = storage.ref().child(`${currentUser.displayName}/${uuidv4()}`);
      const response = await fileRef.putString(imageSrc, 'data_url');
      console.log(response);
      fileURL = await response.ref.getDownloadURL();
    }
    firestore.collection(currentUserUid).add({
      value,
      createAt: Date.now(),
      createId: currentUserUid,
      fileURL: fileURL || null,
    });
    setValue('');
    setImageSrc('');
  };

  // 글쓰기
  const submitHandler = async (e) => {
    e.preventDefault();
    if (currentUser) {
      currentUserUid(currentUser.uid);
    } else {
      currentUserUid('gest');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={value} onChange={changeValue} />
      {currentUser && (
        <>
          <input type="file" onChange={onFileChange(setImageSrc)} accept="image/*"></input>
          {imageSrc && (
            <>
              <img src={imageSrc} alt="이미지소스" width="100px" height="100px" />
              <button onClick={clearImageSrc(setImageSrc)}>Clear</button>
            </>
          )}
        </>
      )}
      <button>보내기</button>
    </form>
  );
}
