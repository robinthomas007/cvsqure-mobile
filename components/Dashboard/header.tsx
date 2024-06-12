import { View, Text, Image } from 'react-native'
import React from 'react'
import { useSession } from './../../context/AuthContext'
import { Colors } from './../../constants/Colors'

export default function Header() {
  const { session } = useSession();
  return (
    <View style={{ padding: 20, paddingTop: 50, backgroundColor: Colors.PRIMARY, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={{ uri: session?.picture }} style={{ width: 45, height: 45, borderRadius: 99 }} />
        <View>
          <Text style={{ color: '#fff', paddingBottom: 5 }}>Welocme,</Text>
          <Text style={{ fontSize: 19, color: '#fff', fontFamily: 'spartan-medium' }}>{session?.name}</Text>
        </View>
      </View>
    </View>
  )
}