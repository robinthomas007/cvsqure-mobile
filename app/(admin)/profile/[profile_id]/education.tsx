import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useUserProfile } from './../../../../context/UserContext'

const EducationDetailsList = () => {
  const { userProfile } = useUserProfile();

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View
      key={index}
      style={[styles.card, { marginBottom: 10 }]}
    >
      <View style={styles.cardContent}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <MaterialIcons
            name="drag-indicator"
            size={24}
            color="#000000"
            style={styles.dragIcon}
          />
          <View>
            <Text style={styles.degree}>{item.degree}</Text>
            <Text style={styles.university}>{item.university}</Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.graduationYear}>{item.graduation_year}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              // Handle edit action
            }}
            style={styles.iconButton}
          >
            <MaterialIcons name="edit" size={20} color="#4F4C4C" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Handle delete action
            }}
            style={styles.iconButton}
          >
            <MaterialIcons name="delete" size={20} color="#FF4D4F" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{
      padding: 16, backgroundColor: '#fff', height: '100%'
    }}>
      <View>
        <Text style={{ fontFamily: 'spartan-bold', color: '#333', fontSize: 24, marginBottom: 10 }}>Education</Text>
        {userProfile?.work_histories?.length === 0 ? <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 24 }}>Great, let’s work on your Education</Text> :
          <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 10, lineHeight: 24 }}>Let's uncover your Education journey, Share your academic adventures</Text>}
      </View>
      <FlatList
        data={userProfile?.educational_details || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  educationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragIcon: {
    marginRight: 10,
  },

  degree: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },
  university: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },
  location: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },

  graduationYear: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'spartan-medium',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default EducationDetailsList;
