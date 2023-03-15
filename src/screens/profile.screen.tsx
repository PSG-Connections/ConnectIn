import {Button, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

import {AuthContext} from '../contexts/auth.context';
import {Blob} from 'buffer';
import {UploadAvatarAPI} from '../apis/user.api';
import {clearEncryptedItemByKey} from '../helpers/utils';
import {launchImageLibrary} from 'react-native-image-picker';

const options: any = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};
export default function Profile(): JSX.Element {
  const [avatar, setAvatar] = React.useState<any>();

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log('ASSETS', images?.assets?.[0]);
    const formData = new FormData();
    let uri = images.assets?.[0].uri;
    let type = images.assets?.[0].type;
    let name = images.assets?.[0].fileName;
    formData.append('file', {
      uri,
      type,
      name,
    });
    // formData.append(
    //   'file',
    //   images?.assets[0],
    //   // {
    //   //   uri: images.assets?.[0].uri as string,
    //   //   type: images.assets?.[0].type || '',
    //   //   name: images.assets?.[0].fileName || '',
    //   // },
    // );
    // const response = await UploadAvatarAPI(formData);
    // console.log('res', response);
    // let responseJson = await response.json();
    // console.log('resJson', responseJson);
  };
  const authContext = useContext(AuthContext);
  const handleOnPressLogOut = async () => {
    try {
      console.log('logout clearing session');

      await clearEncryptedItemByKey('user_session');
    } catch (error) {
      console.log(error);
    }
    authContext.dispatch({type: 'SIGNED_OUT'});
  };
  return (
    <View className="h-screen bg-amber-100 items-center justify-center">
      <Text className="text-black">Profile here ...............</Text>
      <Button title="Upload" onPress={openGallery} />
      <TouchableOpacity
        onPress={() => {
          void (async () => {
            await handleOnPressLogOut();
          })();
        }}>
        <Text className="font-bold text-[#1079D9] pt-4">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
