import ProfileScreen from '../screens/profile.screen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserUpdateScreen from '../screens/userUpdate.screen';
import UserEducationUpdateScreen from '../screens/updateUserEducation.screen';
import CommonUserUpdateScreen from '../screens/commonUpdateScreen';
import UserExperienceUpdateScreen from '../screens/updateUserExperience.screen';

const profileNavigation = createNativeStackNavigator();

export default function ProfileNavigation ({ navigation }: any): JSX.Element {
  return (
    <profileNavigation.Navigator screenOptions={{ headerShown: false }}>
      <profileNavigation.Screen
        name="ProfileNavigationStack"
        component={ProfileScreen}
      />
      <profileNavigation.Screen name="UserUpdateScreen" component={UserUpdateScreen}/>
      <profileNavigation.Screen name="UserEducationUpdateScreen" component={UserEducationUpdateScreen}/>
      <profileNavigation.Screen name='UserExperienceUpdateScreen' component={UserExperienceUpdateScreen}/>
      <profileNavigation.Screen name="CommonUserUpdateScreen" component={CommonUserUpdateScreen}/>
    </profileNavigation.Navigator>
  );
}
