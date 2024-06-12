import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useUserProfile } from './../../../../context/UserContext'

const WorkHistoryList = () => {
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
            <Text style={styles.jobTitle}>{item.job_title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text style={styles.jobLocation}>{item.location}</Text>
            <Text style={styles.jobDates}>{item.start_date} - {item.end_date ? item.end_date : 'Till Date'}</Text>
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
        <Text style={{ fontFamily: 'spartan-bold', color: '#333', fontSize: 24, marginBottom: 10 }}>Job History</Text>
        {userProfile?.work_histories?.length === 0 ? <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 24 }}>Now, let’s fill out your Work history</Text> :
          <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 24, lineHeight: 24 }}>Tell us about another job, We’ll put your Job history in the right order</Text>}
      </View>
      <FlatList
        data={userProfile?.work_histories || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 2 }}
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
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  dragIcon: {
    marginRight: 10,
  },

  jobTitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },
  jobCompany: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },
  jobLocation: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
  },
  jobDates: {
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
    marginRight: 5,
  },
});

export default WorkHistoryList;
