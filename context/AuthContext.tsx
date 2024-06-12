import React from 'react';
import { useStorageState } from './../hooks/useStorageState';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext<{
  signIn: (user: any) => void;
  signOut: () => void;
  session?: any | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: any) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(user));
        },
        signOut: async () => {
          setSession(null);
          await AsyncStorage.removeItem("@user")
          await AsyncStorage.removeItem("@token")
        },
        session: session ? JSON.parse(session) : null,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
