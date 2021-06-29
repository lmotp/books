import React, { useContext, useReducer, createContext } from 'react';

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

export const Users = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializer);

  console.log(state);

  return (
    <UserStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>{children}</UsersDispatchContext.Provider>
    </UserStateContext.Provider>
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
