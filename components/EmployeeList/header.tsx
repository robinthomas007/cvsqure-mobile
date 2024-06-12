import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useSession } from './../../context/AuthContext'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

export default function Header({ setSearch }: { setSearch: any }) {
  const { session } = useSession();
  return (
    <View style={{ padding: 20, paddingTop: 50, backgroundColor: Colors.PRIMARY, height: 200 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={{ uri: session?.picture }} style={{ width: 45, height: 45, borderRadius: 99 }} />
        <View>
          <Text style={{ color: '#fff', paddingBottom: 5 }}>Welocme,</Text>
          <Text style={{ fontSize: 19, color: '#fff', fontFamily: 'spartan-medium' }}>{session?.name}</Text>
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10, backgroundColor: '#fff', marginVertical: 10, marginTop: 15, borderRadius: 8 }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput onChangeText={setSearch} style={{ fontFamily: 'spartan-medium', fontSize: 16 }} placeholder='Search' />
      </View>
    </View>
  )
}