import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from './../constants/Colors';


const obj: any = {
  total: {
    icon: require('./../assets/images/division.png'),
    color: 'sky',
    label: 'Total'
  },
  pending: {
    icon: require('./../assets/images/expired.png'),
    color: 'orange',
    label: 'Pending'
  },
  approved: {
    icon: require('./../assets/images/verified.png'),
    color: 'green',
    label: 'Approved',
  },
  submitted: {
    icon: require('./../assets/images/check.png'),
    color: 'blue',
    label: 'Submitted'
  },
  edit_requested: {
    icon: require('./../assets/images/user-edit.png'),
    color: 'cyan',
    label: 'Requested',
  },
  bench: {
    icon: require('./../assets/images/alone.png'),
    color: 'cyan',
    label: 'Bench',
  },

}

export default function StatusList({ profileReport }: { profileReport: any }) {
  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
        <Text style={{ fontFamily: 'spartan-bold', fontSize: 20 }}>
          #Status
        </Text>
      </View>
      <FlatList
        data={Object.entries(obj)}
        keyExtractor={(item) => item[0]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 10 }}
        renderItem={({ item }) => {
          const status: any = item[0];
          const details: any = item[1];
          return (
            <View style={{ alignItems: 'center', borderWidth: 0 }}>
              <View style={{ padding: 10, marginHorizontal: 10, borderRadius: 99, backgroundColor: Colors.ICON_BG, alignItems: 'center' }}>
                <Image source={details.icon} style={{ width: 40, height: 40 }} />
              </View>
              <Text style={{ fontSize: 12, fontFamily: 'spartan-medium', textAlign: 'center', marginTop: 10 }}>{details.label}</Text>
              <Text style={{ color: Colors.PRIMARY, fontFamily: 'spartan-bold', textAlign: 'center', marginTop: 5 }}>{status !== 'bench' ? profileReport?.profileStatusCount[status] : profileReport?.benchTotalCount?.total}</Text>
            </View>
          );
        }}
      />
    </View >
  )
}