

import { Slot } from 'expo-router';
import { SessionProvider } from './../context/AuthContext';
import { useFonts } from 'expo-font';

export default function Root() {

  useFonts({
    'spartan-bold': require('./../assets/fonts/LeagueSpartan-Bold.ttf'),
    'spartan-light': require('./../assets/fonts/LeagueSpartan-Light.ttf'),
    'spartan-medium': require('./../assets/fonts/LeagueSpartan-Medium.ttf'),
    'spartan-regular': require('./../assets/fonts/LeagueSpartan-Regular.ttf'),
  })
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
