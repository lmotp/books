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

  // 글쓰기
  const submitHandler = (e) => {
    e.preventDefault();
    firestore.collection('cities').add({
      value,
      createAt: Date.now(),
      createId: currentUser.uid,
    });
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={value} onChange={changeValue} />
      <button>보내기</button>
    </form>
  );
}
