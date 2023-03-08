/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { createContext, useReducer, useEffect } from 'react';
import { getEncryptedItemByKey, sleepByMilliSec } from '../helpers/utils';
import { splanScreenMinTime } from '../constants/common';

export const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider({ children }: {children: any}): JSX.Element {
  const [state, dispatch] = useReducer(
    (prevState: any, action: { type: any, accessToken?: any }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.accessToken,
            isLoading: false
          };
        case 'SIGNED_IN':
          return {
            ...prevState,
            isSignout: false,
            isSignedIn: true,
            isLoading: false,
            userToken: action.accessToken
          };
        case 'SIGNED_OUT':
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            isSignedIn: false,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignedIn: false,
      isSignout: false,
      userToken: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let session;
      const startTime = Date.now();
      try {
        session = await getEncryptedItemByKey('user_session');
        console.log('session get', session);
        const timeTowait = splanScreenMinTime - (Date.now() - startTime);
        await sleepByMilliSec(timeTowait);
        if (session !== null) {
          // api call to get new access token with refresh token
          dispatch({ type: 'SIGNED_IN', accessToken: session.accessToken });
        } else {
          dispatch({ type: 'SIGNED_OUT' });
        }
      } catch (error) {
        console.log('session get error ', error);
        const timeTowait = splanScreenMinTime - (Date.now() - startTime);
        await sleepByMilliSec(timeTowait);
        dispatch({ type: 'SIGNED_OUT' });
      }
    };

    void bootstrapAsync();
  }, []);

  return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
  );
}
