import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors';
import { Chip } from 'react-native-paper';

const imageUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const STATUS_ICONS: any = {
  pending: {
    icon: require('./../../assets/images/expired.png'),
  },
  approved: {
    icon: require('./../../assets/images/verified.png'),
  },
  submitted: {
    icon: require('./../../assets/images/check.png'),
  },
  edit_requested: {
    icon: require('./../../assets/images/user-edit.png'),
  },
  bench: {
    icon: require('./../../assets/images/alone.png'),
  },

}

export default function EmployeeCard({ employee }: { employee: any }) {

  const router = useRouter()
  return (
    <TouchableOpacity key={employee.id} style={styles.card}
      onPress={() => router.push(`/profile/${employee.profile.id}`)}
    >
      <View style={{
        display: 'flex', flexDirection:
          'row', borderBottomWidth: 1, paddingBottom: 12,
        borderBottomColor: '#ccc'
      }}>
        <View>
          {employee.profile.personal_details.photo_url && false ? (
            <Image source={{ uri: employee.profile.personal_details.photo_url }} style={{ width: 150, height: 130, borderRadius: 20 }} />

          ) : (
            <Image source={{ uri: imageUrl }} style={{ width: 130, height: 120, borderRadius: 20 }} />

          )}
        </View>
        <View style={{ marginLeft: 12, display: 'flex', justifyContent: 'space-between' }}>
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.name}>{employee?.profile?.personal_details.name}</Text>
              <Image source={STATUS_ICONS[employee?.profile?.status].icon} style={{ width: 20, height: 20 }} />
            </View>
            <Text style={styles.profession}>{employee?.profile?.personal_details.profession}</Text>
            <Text style={styles.status}>Experience : {Number(employee?.profile?.years_of_exp || 0)} Years</Text>
          </View>
          <View style={{ backgroundColor: Colors.PRIMARY, borderRadius: 15, alignItems: 'center', marginTop: 4, width: '100%' }}>
            <Text style={{ fontFamily: 'spartan-light', paddingHorizontal: 20, paddingVertical: 8, color: '#fff' }}>
              {employee.email}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.skills}>{employee?.profile?.skills?.map((skill: any, index: number) => index < 3 && <Chip key={index} icon="information" onPress={() => console.log('Pressed')} style={{ marginRight: 4, marginBottom: 4 }} >{skill.name}</Chip>)}</View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 200
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
  },
  profession: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  skills: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  status: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    fontStyle: 'italic',
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#ffffff40',
  },
});
