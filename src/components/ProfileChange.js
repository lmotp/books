import React, { useState } from 'react';
import { auth, storage } from '../firebase';
import { useAuthContext } from '../Users';

export default function ProfileChange() {
  const { currentUser, onFileChange } = useAuthContext();
  // const newDisplayNameRef = useRef();
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const displayChange = async () => {
    const photoUrl = await (
      await storage.ref().child(`profile/${currentUser.displayName}`).putString(newPhotoURL, 'data_url')
    ).ref.getDownloadURL();

    await auth.currentUser.updateProfile({
      displayName: currentUser.displayName,
      photoURL: photoUrl,
    });
  };

  return (
    <>
      <div>{currentUser.displayName}</div>
      <img src={currentUser.photoURL} alt="프로필이미지" width="100" height="100" />
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <input type="text" ref={newDisplayNameRef} /> */}
        <input type="file" onChange={onFileChange(setNewPhotoURL)} accept="image/*" />
        <button onClick={displayChange}>확인</button>
        <button>취소</button>
      </form>
    </>
  );
}
