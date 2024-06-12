import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useUserProfile } from './../../../../context/UserContext';

const ProjectsList = () => {
  const { userProfile } = useUserProfile();

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <View
      key={index}
      style={[styles.card, { marginBottom: 10 }]}
    >
      <View style={styles.cardContent}>
        <View style={styles.projectInfo}>
          <MaterialIcons
            name="drag-indicator"
            size={28}
            color="#000000"
            style={styles.dragIcon}
          />
          <Text style={styles.projectName}>{item.name}</Text>
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
      <View style={styles.projectDetails}>
        <Text style={styles.projectDescription}>{item.description}</Text>
        <Text style={styles.projectDates}>{item.start_date} - {item.end_date ? item.end_date : 'Till Date'}</Text>
      </View>
    </View>
  );

  return (
    <View style={{
      padding: 16, backgroundColor: '#fff', height: '100%'
    }}>
      <View>
        <Text style={{ fontFamily: 'spartan-bold', color: '#333', fontSize: 24, marginBottom: 10 }}>Project Experience</Text>
        <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 10, lineHeight: 22 }}>Unleash your expertise: Share your project experiences and shine bright</Text>
      </View>
      <FlatList
        data={userProfile?.project_experiences || []}
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
    borderRadius: 15,
    padding: 16
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragIcon: {
    marginRight: 10,
  },
  projectName: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    fontFamily: 'spartan-medium'
  },
  projectDetails: {
    marginTop: 4,
    marginLeft: 7,
    fontFamily: 'spartan-medium'
  },
  projectDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    fontFamily: 'spartan-medium',
    lineHeight: 20
  },
  projectDates: {
    fontSize: 14,
    color: '#666666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default ProjectsList;
