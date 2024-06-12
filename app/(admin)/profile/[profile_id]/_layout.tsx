import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { UserProvider } from './../../../../context/UserContext'
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function Profile() {
  const { profile_id } = useLocalSearchParams<{ profile_id: string }>();
  console.log(profile_id, "profile_idprofile_idprofile_idprofile_id")

  return (
    <UserProvider profileId={profile_id}>
      <Drawer
        screenOptions={{
          drawerLabelStyle: {
            marginLeft: -20
          },
          drawerActiveBackgroundColor: Colors.PRIMARY,
          drawerActiveTintColor: '#fff',
        }}
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Personal Info',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="person" size={size} color={color} />)
          }} />
        <Drawer.Screen
          name="job"
          options={{
            drawerLabel: 'Job History',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="briefcase" size={size} color={color} />)

          }} />
        <Drawer.Screen
          name="education"
          options={{
            drawerLabel: 'Education Details',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="book" size={size} color={color} />)

          }} />
        <Drawer.Screen
          name="skills"
          options={{
            drawerLabel: 'Skills',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="list" size={size} color={color} />)

          }} />
        <Drawer.Screen
          name="project"
          options={{
            drawerLabel: 'Project Experience',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="laptop-outline" size={size} color={color} />)

          }} />
        <Drawer.Screen
          name="certification"
          options={{
            drawerLabel: 'Certification',
            headerTitle: () => (null),
            drawerIcon: ({ size, color }) => (<Ionicons name="newspaper-outline" size={size} color={color} />)

          }} />
      </Drawer>
    </UserProvider >
  )
}