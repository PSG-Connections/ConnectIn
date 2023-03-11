import React, { createContext, useReducer } from 'react';

export const UserContext = createContext<any | null>(null);

export default function UserContextProvider ({ children }: {children: any}): JSX.Element {
  const [state, dispatch] = useReducer(
    (prevState: any, action: { type: any, user?: any }) => {
      switch (action.type) {
        case 'SAVE_USER':
          return {
            ...prevState,
            user: action.user
          };
        case 'DELETE_USER':
          return {
            ...prevState,
            user: null
          };
      }
    },
    {
      user: {}
    }
  );

  const SaveUserInContext = async (data: any) => {
    dispatch({ type: 'SAVE_USER', user: data });
  };

  const ClearUserInContext = async () => {
    dispatch({ type: 'DELETE_USER' });
  };

  return (
        <UserContext.Provider value={{ state, SaveUserInContext, ClearUserInContext }}>
            {children}
        </UserContext.Provider>
  );
}
