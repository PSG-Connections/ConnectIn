/* eslint-disable react-native/no-color-literals */
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, TouchableOpacity } from 'react-native';

// import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { AuthContext } from '../contexts/auth.context';
// import { emitter } from '../constants/events';
import DatePicker from 'react-native-date-picker';
import { USERUPDATE } from '../constants/common.constant';
import { AddUserExperience, UpdateUserExperience } from '../apis/user.api';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../contexts/user.context';

type NavProps = NativeStackScreenProps<any>;
export default function UserExperienceUpdateScreen ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const routeData = route.params;
  const [startDate, setStartDate] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.start_date?.Time) : (new Date()));
  const [endDate, setEndDate] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.end_date?.Time) : (new Date()));
  const [endDateModified, setEndDateModified] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.start_date?.Valid) : false);
  const [startDateModified, setStartDateModified] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.end_date?.Valid) : false);
  const [endDateDisabled, setEndDateDisabled] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const initialUserDetails = {
    id: routeData?.data?.ID,
    title: routeData?.data?.title,
    company: routeData?.data?.company,
    currentlyWorking: routeData?.data?.currently_working,
    employementType: routeData?.data?.employement_type || 'FULL-TIME',
    startDate,
    endDate
  };
  const handleUpdateUserExperience = async (values: any) => {
    console.log('form submit values', values);
    console.log('form submit start date', startDate);
    console.log('form submit end date', endDate);

    const accessToken = authContext.state.userToken;
    const newUserExperience = {
      ID: values.id,
      title: values.title,
      company: values.company,
      currently_working: values.currentlyWorking,
      employement_type: values.employementType,
      start_date: { Time: startDate.toISOString(), Valid: true },
      end_date: { Time: endDate.toISOString(), Valid: !!endDateModified }
    };
    if (routeData?.type === USERUPDATE.TYPE_UPDATE) {
      console.log('Update req =>', newUserExperience);
      const resp = await UpdateUserExperience({ accessToken, newUserExperience });
      if (resp?.error) {
      // handle errors
      }
      console.log('response update Experience details ->', resp);
      // emitter.emit('userExperienceUpdated', resp?.education);
      userContext.UpdateExperienceInContext(resp?.experience);
    }
    if (routeData?.type === USERUPDATE.TYPE_CREATE) {
      delete newUserExperience.ID;
      console.log('create req =>', newUserExperience);
      const resp = await AddUserExperience({ accessToken, newUserExperience });
      if (resp?.error) {
      // handle errors
      }
      console.log('response add Experience details ->', resp);
      //   emitter.emit('userExperienceCreated', resp?.education);
      userContext.UpdateExperienceInContext(resp?.user);
    }
    navigation.goBack();
  };
  return (
    <>
    {
      <SafeAreaView className='bg-slate-800 w-full '>
        <Formik
          initialValues={initialUserDetails}
          onSubmit={handleUpdateUserExperience}>
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
            <View className='h-full'>
              <ScrollView className=''>
                <View className="mx-4 mt-10">
                <Text className="font-bold text-white text-2xl mb-10">Experience</Text>
                <View className="mt-15">
                  <Text className="text-white">Title*</Text>
                  <TextInput
                    value={values.title}
                    numberOfLines={1}
                    className="text-white"
                    onChangeText={handleChange('title')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Company*</Text>
                  <TextInput
                    value={values.company}
                    className="text-white"
                    onChangeText={handleChange('company')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Start date*</Text>
                  <TouchableOpacity onPress={() => {
                    console.log('startdate pressed==>');
                    setShowStartDatePicker(true);
                  }}>
                    <TextInput
                        className="text-white"
                        style={searchStyle.searchInput}
                        underlineColorAndroid="white"
                        value={startDateModified ? startDate.toLocaleDateString() : 'Start Date'}
                        editable={false}
                    />
                  </TouchableOpacity>
                  {showStartDatePicker && (
                    <DatePicker
                        modal={true}
                        open={showStartDatePicker}
                        date={startDate}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                          setStartDate(date);
                          setStartDateModified(true);
                          setEndDateDisabled(false);
                          setShowStartDatePicker(false);
                        }}
                        onCancel={() => {
                          setShowStartDatePicker(false);
                        }}
                        mode="date"
                    />
                  )}
                </View>
                <View className="mt-5">
                  <Text className="text-white">End date</Text>
                  <TouchableOpacity disabled={endDateDisabled} onPress={() => {
                    setShowEndDatePicker(true);
                  }}>
                    <TextInput
                        className="text-white"
                        style={searchStyle.searchInput}
                        underlineColorAndroid="white"
                        value={endDateModified ? endDate.toLocaleDateString() : 'End Date'}
                        editable={false}
                    />
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DatePicker
                        modal={true}
                        open={true}
                        date={endDate}
                        minimumDate={startDate}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                          setEndDate(date);
                          setEndDateModified(true);
                          setShowEndDatePicker(false);
                        }}
                        onCancel={() => {
                          setShowEndDatePicker(false);
                        }}
                        mode="date"
                    />
                  )}
                </View>
                <View className="mt-5">
                  <Text className="text-white">Employement Type*</Text>
                    <Picker
                        selectedValue={values.employementType}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('employementType', itemValue)
                        }>
                        <Picker.Item label="Full-time" value="FULL-TIME" />
                        <Picker.Item label="Part-time" value="PART-TIME" />
                        <Picker.Item label="Self-employed" value="SELF-EMPLOYED" />
                        <Picker.Item label="Internship" value="INTERNSHIP" />
                        <Picker.Item label="Freelance" value="FREELANCE" />
                    </Picker>
                </View>
                <View className="mt-5 flex flex-row items-center">
                    <CheckBox
                        disabled={false}
                        value={values.currentlyWorking}
                        onValueChange={(newValue) => { setFieldValue('currentlyWorking', newValue); }}
                        className='flex'
                    />
                  <Text className="text-white flex ml-5">Currently Working*</Text>
                </View>
                </View>
              </ScrollView>
              <View className='bg-slate-800 w-[100%] h-[50px] flex bottom-0 border-t-2 border-slate-500 mb-2'>
                <View className='flex w-[95%] justify-center mx-auto my-[2px] pt-1'>
                  <TouchableOpacity
                    className='h-[100%] rounded-full w-[100%] bg-blue-500 flex justify-center items-center'
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text className='flex'>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>)}
        </Formik>
      </SafeAreaView>
    }
    </>
  );
}

const searchStyle = StyleSheet.create({
  searchInput: {
    paddingTop: 1,
    includeFontPadding: false,
    color: '#64AFCB',
    borderColor: '#64AFCB',
    borderStyle: 'solid',
    marginTop: 10,
    backgroundColor: '#1E293B',
    position: 'relative',
    zIndex: 2
  }
});
