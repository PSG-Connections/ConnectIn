/* eslint-disable @typescript-eslint/space-before-function-paren */
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { getEncryptedItemByKey, sleepByMilliSec } from '../helpers/utils';
import { splanScreenMinTime } from '../constants/common.constant';
import { getNewToken } from '../apis';
import { GetLoggedInUserAPI } from '../apis/user.api';
import { UserContext } from './user.context';

export const AuthContext = createContext<any | null>(null);

export default function AuthContextProvider({ children }: {children: any}): JSX.Element {
  const userContext = useContext(UserContext);
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

  const SignOut = async(startTime: any) => {
    const timeTowait = splanScreenMinTime - (Date.now() - startTime);
    if (timeTowait > 0) await sleepByMilliSec(timeTowait);
    dispatch({ type: 'SIGNED_OUT' });
  };

  const SignIn = async(startTime: any, accessToken: any) => {
    const timeTowait = splanScreenMinTime - (Date.now() - startTime);
    if (timeTowait > 0) await sleepByMilliSec(timeTowait);
    dispatch({ type: 'SIGNED_IN', accessToken });
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let session;
      const startTime = Date.now();
      try {
        session = await getEncryptedItemByKey('user_session');
        console.log('session get', session);
        if (session !== null) {
          const tokenResponse = await getNewToken();
          const accessToken = tokenResponse?.authorization_details?.access_token;
          if (accessToken) {
            const resp = await GetLoggedInUserAPI({ accessToken });
            if (resp?.error) {
              await SignOut(startTime);
              return;
            }
            userContext.SaveUserInContext(resp?.user);
            await SignIn(startTime, accessToken);
            return;
          } else {
            await SignOut(startTime);
            return;
          }
        } else {
          await SignOut(startTime);
          return;
        }
      } catch (error) {
        console.log('session get error ', error);
        await SignOut(startTime);
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
