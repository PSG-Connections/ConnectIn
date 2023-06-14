import messaging from '@react-native-firebase/messaging';
import { clearEncryptedItemByKey, getEncryptedItemByKey, setEncryptedItemByKey } from '../helpers/utils';
import { UpdateFCMToken } from '../apis/auth.api';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

export const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const tokenRefresh = () => {
  messaging().onTokenRefresh((newToken) => {
    // Send the new token to your server
    void (async () => {
      await UpdateTokenOnServer(newToken);
    })();
  });
};

export const notificationListener = () => {
  const authContext = useContext(AuthContext);
  if (authContext.state.isSignedIn) {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    // Quiet and Background State -> Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      })
      .catch(error => console.log('failed', error));

    // Foreground State
    messaging().onMessage(async remoteMessage => {
      console.log('foreground', remoteMessage);
    });
  }
};

export const storeFCMToken = async (data: object) => {
  try {
    await setEncryptedItemByKey('user_fcm_token', data);
  } catch (error) {
    console.log(error);
  }
};

const UpdateTokenOnServer = async (newToken: string) => {
  const authContext = useContext(AuthContext);
  const accessToken = authContext.state.userToken;
  await clearEncryptedItemByKey('user_fcm_token');
  const fcmData = await getEncryptedItemByKey('user_fcm_token');
  if (fcmData !== null) {
    const reqData = {
      ID: fcmData?.ID,
      token: newToken
    };
    const updateFcmResp = await UpdateFCMToken({ data: reqData, accessToken });
    if (updateFcmResp?.error) {
      // handle errors
    }
    fcmData.token = newToken;
    await storeFCMToken(fcmData);
  }
};
