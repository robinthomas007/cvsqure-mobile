import { View, Image } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Colors } from '@/constants/Colors'

export default function CustomDrawerContent(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* <View style={{ padding: 20, backgroundColor: Colors.PRIMARY }}>
          <Image
            source={require('@/assets/images/cvBuilder.png')}
            style={{ height: 40, width: 120 }}
          />
        </View> */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  )
}