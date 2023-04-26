import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {AuthContext} from '../contexts/auth.context';
import {Formik} from 'formik';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SearchUser} from '../apis/user.api';
import Usersearchresult from '../components/userSearchResult.component';

type NavProps = NativeStackScreenProps<any>;
export default function Search({navigation, route}: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const [limit] = useState(5);
  const [offset] = useState(0);
  const [searchResults, setsearchResults] = useState<[]>();
  const [showSearchAll, setshowSearchAll] = useState(false);
  const handleOnSubmit = async (values: any) => {
    const accessToken = authContext.state.userToken;
    const reqData = {
      searchValue: values?.search,
      accessToken,
      offset,
      limit,
    };
    const response = await SearchUser(reqData);
    if (response?.error) {
      // handle error
    }
    if (limit === -1) {
      setshowSearchAll(false);
    } else {
      setshowSearchAll(true);
    }
    console.log(response?.user);
    if (response?.user.length === 0 || response?.user.length < limit) {
      setshowSearchAll(false);
    }
    setsearchResults(response?.user);
  };
  return (
    <SafeAreaView className=" h-screen w-screen">
      <ScrollView className="flex flex-col">
        <View className="flex items-center mt-12">
          <Formik initialValues={{search: ''}} onSubmit={handleOnSubmit}>
            {({handleChange, handleSubmit, values}) => (
              <View className="w-[90%] flex flex-row gap-5 items-center justify-center">
                <TextInput
                  className="bg-[#6DB9FF] w-full rounded-full pl-4 text-black font-black text-[24px]  "
                  placeholder="Search"
                  keyboardType="web-search"
                  returnKeyType="search"
                  onSubmitEditing={() => handleSubmit()}
                  onChangeText={handleChange('search')}
                  value={values.search}
                  placeholderTextColor={'black'}
                />
              </View>
            )}
          </Formik>
        </View>
        <View className="flex flex-col items-center justify-center pt-12">
          {searchResults?.map((item: any) => (
            <Usersearchresult key={item?.email} data={item} />
          ))}
          {/* <Usersearchresult/>
          <Usersearchresult/>
          <Usersearchresult/> */}
        </View>
        {showSearchAll && (
          <View className="">
            <View className="flex items-center pt-10 pb-5">
              <TouchableOpacity
                // onPress={() => {
                //   handleOnShowAllResults();
                // }}
                className="">
                <Text className=" text-[#1079D9] text-[14px] font-black">
                  See all results
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full h-2 bg-[#6DB9FF]"></View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
