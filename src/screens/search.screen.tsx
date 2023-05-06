import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { AuthContext } from '../contexts/auth.context';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchUser } from '../apis/user.api';
import Usersearchresult from '../components/userSearchResult.component';

type NavProps = NativeStackScreenProps<any>;
export default function Search ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const [limit] = useState(5);
  const [offset] = useState(0);
  const [searchResults, setsearchResults] = useState<[]>();
  const handleOnSubmit = async (values: any) => {
    const accessToken = authContext.state.userToken;
    const reqData = {
      searchValue: values?.search,
      accessToken,
      offset,
      limit
    };
    const response = await SearchUser(reqData);
    if (response?.error) {
      // handle error
    }
    setsearchResults(response?.user);
  };
  return (
    <SafeAreaView className=" h-screen w-screen bg-slate-600">
      <View className="flex items-center mt-3 fixed">
          <Formik initialValues={{ search: '' }} onSubmit={handleOnSubmit}>
            {({ handleChange, handleSubmit, values }) => (
              <View className="w-[100%] flex flex-row items-center justify-center">
                <TextInput
                  className="w-[98%] rounded-xl pl-4 text-slate-300 font-black text-[18px]  "
                  placeholder="Search"
                  keyboardType="web-search"
                  returnKeyType="search"
                  onSubmitEditing={() => handleSubmit()}
                  onChangeText={handleChange('search')}
                  value={values.search}
                  placeholderTextColor={'white'}
                />
              </View>
            )}
          </Formik>
        </View>
      <ScrollView className="flex flex-col">
        <View className="flex flex-col items-center justify-center pt-3">
          {searchResults?.map((item: any, index: any) => (
            <View key={index} className='flex w-full] items-center'>
            <TouchableOpacity onPress={() => {
              navigation.navigate('UserProfileComponent', { email: item?.email });
            }}>
                <Usersearchresult data={item} />
              </TouchableOpacity>
              </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
