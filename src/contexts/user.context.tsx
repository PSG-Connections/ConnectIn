import React, { createContext, useState } from 'react';
import { User } from '../models/user.model';

export const UserContext = createContext<any | null>(null);

export default function UserContextProvider ({ children }: {children: any}): JSX.Element {
  const [userData, setUserData] = useState<User | null>(null);

  const SaveUserInContext = async (data: User) => {
    setUserData(data);
  };

  const ClearUserInContext = async () => {
    setUserData(null);
  };

  return (
        <UserContext.Provider value={{ userData, SaveUserInContext, ClearUserInContext }}>
            {children}
        </UserContext.Provider>
  );
}
