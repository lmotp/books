import React, { useContext, useReducer, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';

const initializer = {
  categories: [
    { id: 1, category: '비발디' },
    { id: 2, category: '베토벤' },
    { id: 3, category: '모차르트' },
  ],
  select: [
    { id: 1, category: 'PLih16QaoQoPeQi0fNFAM2ARd904YSuzOC' },
    { id: 2, category: 'PLih16QaoQoPcHvLAFtMMFFDv2aZm71ipm' },
    { id: 3, category: 'PLih16QaoQoPcoHcobmayWb6ijKeMjdds5' },
  ],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT':
      return { ...state.action };
    default:
      throw new Error(`unHandled ${action.type}`);
  }
};

const UserStateContext = createContext();
const UsersDispatchContext = createContext();
const AuthContext = createContext();

export const Users = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializer);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const [filename, setFilename] = useState();
  const [background, setBackground] = useState();
  const [userObj, setUserObj] = useState(null);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
  };
  const changeDisplayName = (name, src) => {
    auth.currentUser.updateProfile({
      displayName: name,
      photoURL: src,
    });
  };

  const onFileChange = (changeImageSrc) => (e) => {
    let theFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      changeImageSrc(e.target.result);
      setFilename(theFile.name);
    };
    reader.readAsDataURL(theFile);
  };

  const clearImageSrc = (changeImageSrc) => (e) => {
    e.preventDefault();
    changeImageSrc('');
  };

  useEffect(() => {
    const authStateChange = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return authStateChange;
  }, []);

  const users = {
    currentUser,
    signup,
    login,
    logout,
    changeDisplayName,
    imageSrc,
    onFileChange,
    clearImageSrc,
    filename,
    setImageSrc,
    setBackground,
    background,
    setUserObj,
    userObj,
  };
  return (
    <AuthContext.Provider value={users}>
      <UserStateContext.Provider value={state}>
        <UsersDispatchContext.Provider value={dispatch}>{!loading && children}</UsersDispatchContext.Provider>
      </UserStateContext.Provider>
    </AuthContext.Provider>
  );
};

export function useUsersState() {
  const context = useContext(UserStateContext);
  return context;
}

export function useUsersDispatch() {
  const context = useContext(UsersDispatchContext);
  return context;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
