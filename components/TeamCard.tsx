import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from './../constants/Colors';

const TeamCard = ({ teams, handleClick, label = 'View Profile' }: { teams: any, handleClick: any, label?: any }) => {
  const getNameAlias = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };

  const imageUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
        <Text style={{ fontFamily: 'spartan-bold', fontSize: 20 }}>
          #You may know
        </Text>
        <Text style={{ color: Colors.PRIMARY }}>View All</Text>
      </View>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        renderItem={({ item }) => {
          return (
            <View key={item.id} style={{ borderRadius: 15, marginRight: 15, backgroundColor: '#fff' }}>
              <View style={{ padding: 10 }}>
                <Image source={{ uri: imageUrl }} style={{ width: 250, height: 130, borderRadius: 20 }} />
              </View>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 15, backgroundColor: '#fff' }}>
                <Text style={{ fontFamily: 'spartan-bold', fontSize: 20, marginVertical: 8 }}>
                  {item.name}
                </Text>
                <Text style={{ fontFamily: 'spartan-medium', color: Colors.GRAY }} >
                  {item.profile.personal_details.profession || 'Profession'}
                </Text>
                <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, borderWidth: 1, borderRadius: 140, marginVertical: 6, borderColor: Colors.PRIMARY }}>
                  <Text style={{ color: Colors.PRIMARY }}>View Profile</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.PRIMARY, borderBottomRightRadius: 15, borderBottomLeftRadius: 15, alignItems: 'center', marginTop: 4, width: '100%' }}>
                  <Text style={{ fontFamily: 'spartan-light', paddingHorizontal: 20, paddingVertical: 8, color: '#fff' }}>
                    {item.profile.personal_details.email}
                  </Text>
                </View>
              </View>

            </View>
          );
        }}
      />
    </View >
  );
};

export default TeamCard;
