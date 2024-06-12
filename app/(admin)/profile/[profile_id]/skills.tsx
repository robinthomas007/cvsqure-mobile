import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { Button, Card, IconButton, Divider } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useUserProfile } from './../../../../context/UserContext';
import { Rating } from 'react-native-elements';
import axios from 'axios';
import { token } from '@/components/token';

const SkillsForm = () => {
  const { userProfile } = useUserProfile();
  const [skills, setSkills] = useState(userProfile.skills || []);
  const [skillsSet, setSkillsSet] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const fetchSkillsSet = async () => {
      try {
        if (token) {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/skills?q=${q}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setSkillsSet(response.data.skills);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchSkillsSet();
  }, [q]);

  const handleChangeSkills = (text: any) => {
    setQ(text)
  };

  const handleAddSkills = (skill: any) => {
    setSkills([...skills, skill]);
  };

  const handleRemoveSkills = (index: number) => {
    const updatedSkills = skills.filter((_: any, i: number) => i !== index);
    setSkills(updatedSkills);
  };

  const renderSkillsSetItem = ({ item }: { item: any }) => {
    const isSelected = skills.some((skill: any) => skill.name === item.name);
    return (
      <TouchableOpacity
        onPress={() => handleAddSkills(item)}
        style={[styles.skillItem, isSelected && styles.skillItemSelected]}
      >
        <MaterialIcons
          name={isSelected ? 'check-circle' : 'add-circle'}
          size={22}
          color={isSelected ? '#F99417' : '#2b648d'}
        />
        <Text style={[styles.skillText, isSelected && styles.skillTextSelected]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSelectedSkill = ({ item, index }: { item: any, index: number }) => (
    <View key={index} style={styles.selectedSkillContainer}>
      <Rating
        readonly={false}
        startingValue={item.rating || 0}
        imageSize={22}
        style={styles.rating}
        onFinishRating={(rating: any) => {
          const updatedSkills = skills.map((skill: any, i: number) =>
            i === index ? { ...skill, rating } : skill
          );
          setSkills(updatedSkills);
        }}
      />
      <TextInput
        style={styles.skillInput}
        value={item.name}
        editable={false}
      />
      <IconButton
        icon="delete"
        size={20}
        onPress={() => handleRemoveSkills(index)}
      />
    </View>
  );

  const handleSaveAndNext = () => {
    // Handle save and next action
  };

  const handleBack = () => {
    // Handle back action
  };

  const sections = [
    { title: 'Available Skills', data: skillsSet, renderItem: renderSkillsSetItem },
    { title: 'Selected Skills', data: skills, renderItem: renderSelectedSkill },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Skills</Text>
      <Text style={styles.subHeader}>Time to showcase your skills and expertise</Text>
      <TextInput
        placeholder="Search/Filter Skills"
        onChangeText={handleChangeSkills}
        style={styles.searchInput}
      />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.sectionListContent}
      />
      <View style={styles.actions}>
        <Button mode="contained" onPress={handleBack} style={styles.button}>
          Back
        </Button>
        <Button mode="contained" onPress={handleSaveAndNext} style={styles.button}>
          Save and Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    color: '#333',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 8,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  sectionListContent: {
    paddingBottom: 16,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  skillItemSelected: {
    backgroundColor: '#f0f0f0',
  },
  skillText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  skillTextSelected: {
    color: '#999',
  },
  selectedSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rating: {
    marginRight: 8,
  },
  skillInput: {
    flex: 1,
    padding: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    margin: 8,
  },
});

export default SkillsForm;
