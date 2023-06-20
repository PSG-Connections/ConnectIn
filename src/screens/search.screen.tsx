import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { AuthContext } from '../contexts/auth.context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchUser } from '../apis/user.api';
import Usersearchresult from '../components/userSearchResult.component';
import { UserSearchResult } from '../models/user.model';

type NavProps = NativeStackScreenProps<any>;
export default function Search ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  // const fetchResults = useRef<() => void>();
  useEffect(() => {
    console.log('in use effect==> searchvalue');
    if (searchValue.length > 0) {
      setOffset(0); // reset offset when search value changes
      void (async () => {
        const resp = await searchUserApiCall();
        if (resp?.error) {
          // handle errors
        } else {
          setSearchResults(resp?.user);
        }
      })();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    console.log('in use effect==> offset');
    if (searchValue.length > 0) {
      void (async () => {
        const resp = await searchUserApiCall();
        if (resp?.error) {
          // handle errors
        } else {
          setSearchResults((prevState) => {
            return [...prevState, ...resp?.user];
          });
        }
      })();
    }
  }, [offset]);

  const searchUserApiCall = async () => {
    const accessToken = authContext.state.userToken;
    const reqData = {
      searchValue,
      accessToken,
      offset,
      limit
    };
    console.log('req data---->>>', reqData);
    const response = await SearchUser(reqData);
    console.log('response--->', response);
    return response;
  };
  const handleEndReached = () => {
    setOffset((prevState) => (prevState + limit));
  };

  return (
    <SafeAreaView className=" h-screen w-screen bg-[#03001C]">
      <View className="flex items-center mt-3 fixed">
              <View className="w-[100%] flex flex-row items-center justify-center">
                <TextInput
                  className="w-[98%] rounded-xl pl-4 text-slate-300 font-black text-[18px]  "
                  placeholder="Search"
                  keyboardType="web-search"
                  returnKeyType="search"
                  onChangeText={(value) => setSearchValue(value)}
                  value={searchValue}
                  placeholderTextColor={'white'}
                  clearButtonMode='unless-editing'
                />
              </View>
        </View>
    <View className='h-full'>
    <FlatList
      className=''
        data={searchResults}
        renderItem={({ item }) => {
          return (
            <View className='flex w-full] items-center'>
            <TouchableOpacity onPress={() => {
              navigation.navigate('UserProfileComponent', { email: item?.email });
            }}>
                <Usersearchresult data={item} />
              </TouchableOpacity>
              </View>
          );
        }}
        onEndReached={handleEndReached}
        keyExtractor={item => item?.ID.toString()}
        onEndReachedThreshold={1}
        ItemSeparatorComponent={() => {
          return (
            <View className='border-t-2 border-slate-200'>

            </View>
          );
        }}
      />
    </View>
    </SafeAreaView>
  );
}
