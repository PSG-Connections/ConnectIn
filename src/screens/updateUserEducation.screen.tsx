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
import { AddUserEducation, UpdateUserEducation } from '../apis/user.api';
import { UserContext } from '../contexts/user.context';

type NavProps = NativeStackScreenProps<any>;
export default function UserEducationUpdateScreen ({ navigation, route }: NavProps): JSX.Element {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const routeData = route.params;
  const [startDate, setStartDate] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.start_date) : (new Date()));
  const [endDate, setEndDate] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE ? new Date(routeData?.data?.end_date) : (new Date()));
  const [endDateModified, setEndDateModified] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE);
  const [startDateModified, setStartDateModified] = useState(routeData?.type === USERUPDATE.TYPE_UPDATE);
  const [endDateDisabled, setEndDateDisabled] = useState(true);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const initialUserDetails = {
    id: routeData?.data?.ID,
    school: routeData?.data?.school,
    degree: routeData?.data?.degree,
    fieldOfStudy: routeData?.data?.field_of_study,
    grade: routeData?.data?.grade,
    startDate,
    endDate
  };
  const handleUpdateUserEducation = async (values: any) => {
    console.log('form submit values', values);
    console.log('form submit start date', startDate);
    console.log('form submit end date', endDate);

    const accessToken = authContext.state.userToken;
    const newUserEducation = {
      ID: values.id,
      school: values.school,
      degree: values.degree,
      field_of_study: values.fieldOfStudy,
      grade: values.grade,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    };
    if (routeData?.type === USERUPDATE.TYPE_UPDATE) {
      console.log('Update req =>', newUserEducation);
      const resp = await UpdateUserEducation({ accessToken, newUserEducation });
      if (resp?.error) {
      // handle errors
      }
      console.log('response update education details ->', resp);
      // emitter.emit('userEducationUpdated', resp?.education);
      userContext.UpdateEducationInContext(resp?.education);
    }
    if (routeData?.type === USERUPDATE.TYPE_CREATE) {
      delete newUserEducation.ID;
      console.log('create req =>', newUserEducation);
      const resp = await AddUserEducation({ accessToken, newUserEducation });
      if (resp?.error) {
      // handle errors
      }
      console.log('response add education details ->', resp);
      userContext.UpdateEducationInContext(resp?.user);
      // emitter.emit('userEducationCreated', resp?.education);
    }
    navigation.goBack();
  };
  return (
    <>
    {
      <SafeAreaView className='bg-[#03001C] w-full '>
        <Formik
          initialValues={initialUserDetails}
          onSubmit={handleUpdateUserEducation}>
            {({ handleChange, handleSubmit, values }) => (
            <View className='h-full'>
              <ScrollView className=''>
                <View className="mx-4 mt-10">
                <Text className="font-bold text-white text-2xl mb-10">Education</Text>
                <View className="mt-15">
                  <Text className="text-white">School*</Text>
                  <TextInput
                    value={values.school}
                    numberOfLines={1}
                    className="text-white"
                    onChangeText={handleChange('school')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Degree</Text>
                  <TextInput
                    value={values.degree}
                    className="text-white"
                    onChangeText={handleChange('degree')}
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Field of study</Text>
                  <TextInput
                    className="text-white"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('fieldOfStudy')}
                    value={values.fieldOfStudy}
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Grade</Text>
                  <TextInput
                    className="text-white"
                    keyboardType="numeric"
                    style={searchStyle.searchInput}
                    underlineColorAndroid="white"
                    onChangeText={handleChange('grade')}
                    value={values.grade}
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-white">Start date</Text>
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
                  <TouchableOpacity
                    disabled={endDateDisabled}
                    onPress={() => {
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
                </View>
              </ScrollView>
              <View className='bg-[#03001C] w-[100%] h-[50px] flex bottom-0 border-t-2 border-slate-500 mb-2'>
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
    backgroundColor: '#03001C',
    position: 'relative',
    zIndex: 2
  }
});
