import React, { useState } from 'react';
import { firestore } from '../firebase';

export default function Write({ write }) {
  const [changeWrite, setChangeWrite] = useState(false);
  const [newWrite, setNewWrite] = useState('');

  // 삭제하기
  const deleteButton = async () => {
    await firestore.doc(`cities/${write.id}`).delete();
  };

  // 바꾸는창 토글
  const toggleEditing = () => {
    setChangeWrite((prev) => !prev);
  };

  //내용 바꾸기

  const changeButton = async (e) => {
    e.preventDefault();
    await firestore.doc(`cities/${write.id}`).update({
      value: newWrite,
    });
    setChangeWrite(false);
  };

  // 온체인지
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewWrite(value);
  };

  return (
    <>
      <h3>{write.value}</h3>
      <button onClick={deleteButton}>삭제</button>
      <button onClick={toggleEditing}>변경</button>
      {changeWrite && (
        <>
          <form onSubmit={changeButton}>
            <input type="text" onChange={onChange} value={newWrite} required />
            <button>바꾸깅</button>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      )}
    </>
  );
}
