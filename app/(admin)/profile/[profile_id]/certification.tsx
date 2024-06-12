import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useUserProfile } from './../../../../context/UserContext';

const CertificationsList = () => {
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
            <Text style={styles.certName}>
              {item.name}
            </Text>
            <Text style={styles.certIssuedBy}>{item.issued_by}</Text>
            <Text style={styles.certUrl}>{item.url}</Text>
            <Text style={styles.certExpiresOn}>Expires on - {item.expires_on}</Text>
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
        <Text style={{ fontFamily: 'spartan-bold', color: '#333', fontSize: 24, marginBottom: 10 }}>Certification</Text>
        <Text style={{ fontFamily: 'spartan-medium', color: '#666', fontSize: 16, marginBottom: 10, lineHeight: 22 }}>Elevate your expertise with certified insights.</Text>
      </View>
      <FlatList
        data={userProfile?.certifications || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  certInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragIcon: {
    marginRight: 10,
  },

  certName: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'spartan-medium'
  },
  certIssuedBy: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666666',
    fontFamily: 'spartan-medium'
  },
  certUrl: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    fontFamily: 'spartan-medium',
    // maxWidth: 200,
  },
  certExpiresOn: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'spartan-medium'
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

export default CertificationsList;
