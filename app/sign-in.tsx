

import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, StyleSheet, Image, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser"
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack, useNavigation, useRouter } from 'expo-router';
import { useSession } from './../context/AuthContext';

WebBrowser.maybeCompleteAuthSession()

function LogoTitle() {
  return (
    <Image
      source={require('@/assets/images/cvBuilder.png')}
      style={styles.logo}
    />
  );
}

export default function Index() {
  const [user, setUser] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
  })

  const { signIn } = useSession();

  const router = useRouter();

  const isLoggedIn = async () => {
    const user = await AsyncStorage.getItem("@user")
    if (user) {
      signIn(user)
      router.push('/(admin)')
    } else {
      promptAsync()
    }
  }

  useEffect(() => {
    handleSigninWithGoogle()
  }, [response])

  const handleSigninWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user")
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication?.accessToken)
      }
    } else {
      setUser(JSON.parse(user))
      signIn(user)
      router.push('/(admin)')
    }
  }

  const getUserInfo = async (token: any) => {
    // this is from backend
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const user = await response.json()
      await AsyncStorage.setItem("@user", JSON.stringify(user))
      await AsyncStorage.setItem("@token", JSON.stringify(token))
      setUser(user)
      router.push('/(admin)')
      signIn(user)
    } catch (error) {

    }
  }

  console.log(user, "useruseruser")

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: '#0D9488' },
          // headerTitle: (props: any) => <View style={{ display: 'flex', justifyContent: 'flex-start' }}><LogoTitle {...props} /></View>,
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <LogoTitle />
            </View>
          ),
        }}
      />
      <View style={styles.loginLayout}>
        <View style={styles.header}>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Sign in with your Google Account</Text>
          <Pressable style={styles.button} onPress={() => isLoggedIn()}>
            <Text style={styles.buttonText}>Login with Google</Text>
          </Pressable>
          <Text style={styles.footerText}>
            By clicking "Sign in with Google", you are accepting the Terms & Conditions and Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLayout: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    zIndex: 10,
  },
  header: {
    backgroundColor: '#0D9488',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cvBuilderImage: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  card: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#374151',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footerText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 80,
    height: 30,
  },
});
