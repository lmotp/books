import React, { useState } from 'react';
import { firestore } from '../firebase';
import { useAuthContext } from '../Users';

export default function Form() {
  const [value, setValue] = useState('');
  const { currentUser } = useAuthContext();

  // 메모장기능
  const changeValue = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  const currentUserUid = (currentUserUid) => {
    firestore.collection(currentUserUid).add({
      value,
      createAt: Date.now(),
      createId: currentUser.uid,
    });
    setValue('');
  };

  // 글쓰기
  const submitHandler = (e) => {
    e.preventDefault();
    if (currentUser) {
      currentUserUid(currentUser.uid);
    } else {
      currentUserUid('cities');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={value} onChange={changeValue} />
      <button>보내기</button>
    </form>
  );
}
