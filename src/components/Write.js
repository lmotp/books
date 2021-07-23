import React, { useState } from 'react';
import { firestore, storage } from '../firebase';
import { useAuthContext } from '../Users';

export default function Write({ write }) {
  const { currentUser, onFileChange, clearImageSrc } = useAuthContext();
  const [changeWrite, setChangeWrite] = useState(false);
  const [newWrite, setNewWrite] = useState('');
  const [newImageSrc, setNewImageSrc] = useState('');
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
  const toggleEditing = (e) => {
    e.stopPropagation();
    setChangeWrite((prev) => !prev);
  };

  //내용 바꾸기

  const changeButtonCondition = (currentUserUid) => {
    firestore.doc(`${currentUserUid}/${write.id}`).update({
      value: newWrite,
      fileURL: newImageSrc || null,
    });
  };

  const changeButton = async (e) => {
    e.preventDefault();
    if (currentUser) {
      await changeButtonCondition(currentUser.uid);
      setNewImageSrc('');
      setNewWrite('');
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

  return (
    <div className="write-box">
      <div className="write-box2">
        <h3>{write.value}</h3>
        {write.fileURL && <img className="write-img" src={write.fileURL} alt="img" />}
        <div className="picture-state-button">
          <button onClick={deleteButton}>삭제</button>
          <button onClick={toggleEditing}>변경</button>
        </div>
      </div>
      {changeWrite && (
        <>
          <form onSubmit={changeButton}>
            <input type="text" onChange={onChange} value={newWrite} />
            <input type="file" onChange={onFileChange(setNewImageSrc)} accept="image/*"></input>
            {newImageSrc && (
              <>
                <img src={newImageSrc} alt="이미지소스" width="100px" height="100px" />
                <button onClick={clearImageSrc(setNewImageSrc)}>Clear</button>
              </>
            )}
            <button>바꾸깅</button>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      )}
    </div>
  );
}
