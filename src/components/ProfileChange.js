import React, { memo, useState } from 'react';
import { auth, storage } from '../firebase';
import { useAuthContext } from '../Users';

function ProfileChange({ profileCancle123 }) {
  const { currentUser, onFileChange, setUserObj } = useAuthContext();
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const refreshUser = () => {
    setUserObj({
      photoURL: currentUser.photoURL,
    });
  };

  const displayChangeImage = async () => {
    const photoUrl = await (
      await storage.ref().child(`profile/${currentUser.displayName}`).putString(newPhotoURL, 'data_url')
    ).ref.getDownloadURL();

    await auth.currentUser.updateProfile({
      photoURL: photoUrl,
    });
    refreshUser();
  };

  console.log(profileCancle123);

  return (
    <>
      <div>{currentUser.displayName}</div>
      <img src={currentUser.photoURL} alt="프로필이미지" width="100" height="100" />
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" onChange={onFileChange(setNewPhotoURL)} accept="image/*" />
        <button onClick={displayChangeImage}>확인</button>
        <button onClick={profileCancle123}>취소</button>
      </form>
    </>
  );
}

export default memo(ProfileChange);
