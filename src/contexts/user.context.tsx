import React, { createContext, useState } from 'react';
import { User, UserEducation, UserExperience } from '../models/user.model';

export const UserContext = createContext<any | null>(null);

export default function UserContextProvider ({ children }: {children: any}): JSX.Element {
  const [userData, setUserData] = useState<Partial<User>>({});

  const SaveUserInContext = async (data: User) => {
    setUserData(data);
  };

  const ClearUserInContext = async () => {
    setUserData({});
  };

  const UpdateEducationInContext = async (data: any) => {
    console.log('incoming data', data);
    if (!userData.UserEducation) {
      setUserData(prevState => {
        return { ...prevState, UserEducation: data };
      });
    } else {
      const newUserEducation = userData.UserEducation;
      let isNewData = true;
      for (let i = 0; i < newUserEducation?.length; i++) {
        if (newUserEducation[i].ID === data.ID) {
          newUserEducation[i] = data as UserEducation;
          isNewData = false;
          break;
        }
      }
      if (isNewData) {
        newUserEducation.push(data as UserEducation);
      }
      setUserData(prevState => {
        return { ...prevState, UserEducation: newUserEducation };
      });
    }
    // console.log('new user education -->', userData.UserEducation);
  };

  const UpdateExperienceInContext = async (data: any) => {
    if (!userData.UserExperience) {
      setUserData(prevState => {
        return { ...prevState, UserExperience: data };
      });
    } else {
      const newUserExperience = userData.UserExperience;
      let isNewData = true;
      for (let i = 0; i < newUserExperience?.length; i++) {
        if (newUserExperience[i].ID === data.ID) {
          newUserExperience[i] = data as UserExperience;
          isNewData = false;
          break;
        }
      }
      if (isNewData) {
        newUserExperience.push(data as UserExperience);
      }
      setUserData(prevState => {
        return { ...prevState, UserExperience: newUserExperience };
      });
    }
  };

  return (
        <UserContext.Provider value={{
          userData,
          SaveUserInContext,
          ClearUserInContext,
          UpdateEducationInContext,
          UpdateExperienceInContext
        }}>
            {children}
        </UserContext.Provider>
  );
}
