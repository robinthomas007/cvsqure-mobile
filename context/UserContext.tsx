import React, { createContext, useState, useContext, useCallback, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import axios from 'axios'
import { token } from '@/components/token'

interface UserContextType {
  userProfile: any;
  setUserProfile: Dispatch<SetStateAction<any>>;
  fetchUserInfo: () => void;
  profileId: any;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children, profileId }: { children: any, profileId: any }) => {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [percent, setPercent] = useState<any>(20);

  const fetchUserInfo = useCallback(async () => {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/api/admin/profile/${profileId}`
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserProfile(response.data);
    } catch (err) {

    }
  }, [profileId])

  useEffect(() => {
    fetchUserInfo()
  }, [profileId])

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, fetchUserInfo, profileId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
};
