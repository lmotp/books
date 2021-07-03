import React, { useContext, useReducer, createContext, useState, useEffect } from 'react';
import { auth } from './firebase';

const initializer = {
  categories: [
    { id: 1, category: '로맨스' },
    { id: 2, category: '드라마' },
    { id: 3, category: '코미디' },
    { id: 4, category: '액션' },
    { id: 5, category: '공포' },
    { id: 6, category: '스릴러' },
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

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    return auth.signOut();
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
