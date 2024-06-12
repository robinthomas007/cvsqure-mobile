

import React, { useEffect, useState, useMemo } from 'react'
import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import axios from 'axios'
import { useSession } from './../../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SkillProgress from './../../components/skillsProgress'
import TeamCard from './../../components/TeamCard'
import ProfilePieChart from './../../components/ProfilePieChart'
import ProfileCountChart from './../../components/ProfileCountChart'
import Header from '@/components/Dashboard/header';
import StatusList from '@/components/StatusList';

// import { token } from '@/components/token'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const dashboard = () => {
  const [profileReport, setProfileReport] = useState<any>(null)
  const [teams, setTeams] = useState<any>(null)
  const { session } = useSession();
  // 

  useEffect(() => {
    const fetchProfileMetrics = async () => {
      try {
        const token = await AsyncStorage.getItem("@token")
        if (token) {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/admin/profile/metrics`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setProfileReport(response.data?.data);
        }
      } catch (error: any) {
        console.log('Error:', error.config);
      }
    };

    fetchProfileMetrics();
  }, []);


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = await AsyncStorage.getItem("@token")
        console.log(token, "tokentokentokentoken")
        if (token) {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/users?q=&page=1&limit=4&status=approved`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTeams(response.data?.users);
        }
      } catch (error) {
        console.log(error, "==")
      }
    };

    fetchTeams();
  }, []);

  const updatedTeams = useMemo(() => {
    if (!teams) return []

    if (teams && teams.length > 0) {
      return teams.map((team: any) => ({
        ...team,
        backgroundColor: getRandomColor()
      }));
    }

  }, [teams])

  const handlePreview = () => {

  }

  return (
    <ScrollView>
      <Header />
      <TeamCard teams={updatedTeams} handleClick={handlePreview} />
      <StatusList profileReport={profileReport} />
      <SkillProgress profileReport={profileReport} />
      <ProfilePieChart profileReport={profileReport} />
      <ProfileCountChart profileReport={profileReport} />
    </ScrollView >
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  statusCard: {
    marginBottom: 6,
    // width: '48%',
    margin: 4
  },
  iconWrapper: {
    borderRadius: 50,
    borderWidth: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  link: {
    alignItems: 'center',
    marginBottom: 12,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'spartan-bold'
  },
});


export default dashboard
