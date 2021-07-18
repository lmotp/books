import React, { useState } from 'react';
import { firestore, storage } from '../firebase';
import { useAuthContext } from '../Users';

export default function Write({ write }) {
  const { currentUser } = useAuthContext();
  const [changeWrite, setChangeWrite] = useState(false);
  const [newWrite, setNewWrite] = useState('');
  const gest = 'gest';

  // 삭제하기
  const deleButtonCondition = (currentUserUid) => {
    firestore.doc(`${currentUserUid}/${write.id}`).delete();
  };

  const deleteButton = async () => {
    if (currentUser) {
      await deleButtonCondition(currentUser.uid);
      if (write.fileURL) {
        await storage.refFromURL(write.fileURL).delete();
      }
    } else {
      await deleButtonCondition(gest);
    }
  };

  // 바꾸는창 토글
  const toggleEditing = () => {
    setChangeWrite((prev) => !prev);
  };

  //내용 바꾸기

  const changeButtonCondition = (currentUserUid) => {
    firestore.doc(`${currentUserUid}/${write.id}`).update({
      value: newWrite,
    });
  };

  const changeButton = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await changeButtonCondition(currentUser.uid);
    } else {
      await changeButtonCondition(gest);
    }
    setChangeWrite(false);
  };

  // 온체인지
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewWrite(value);
  };
  console.log('hi');
  return (
    <>
      <h3>{write.value}</h3>
      {write.fileURL && <img src={write.fileURL} width="100px" height="100px" alt="img" />}
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
