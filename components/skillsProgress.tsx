import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const SkillProgress = ({ profileReport }: { profileReport: any }) => {
  const colours = ['#29B42A', '#A662DE', '#257AF7', '#286A58', '#6DEDFE'];
  const skills = profileReport?.top30SkillsCount?.skills?.slice(0, 5) || [];

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text style={{ fontFamily: 'spartan-bold', fontSize: 20 }}>
          #Top Rated Skills
        </Text>
      </View>
      <View style={{ backgroundColor: '#fff', padding: 20, marginTop: 6 }}>
        {skills.map((skill: any, index: number) => {
          const skillPercentage = (skill.Count / profileReport?.profileStatusCount.total) * 100;
          return (
            <View style={styles.skillContainer} key={index}>
              <Text style={styles.skillLabel}>{skill.Label}</Text>
              <Progress.Bar
                progress={skillPercentage / 100}
                width={null}
                color={colours[index]}
                borderRadius={10}
                height={10}
                borderColor='#f5f5f5'
                unfilledColor='#f5f5f5'
              />
              <Text style={styles.skillCount}>{skill.Count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  skillContainer: {
    marginVertical: 6,
  },
  skillLabel: {
    fontSize: 16,
    marginRight: 8,
    width: '100%',
    marginBottom: 5,
  },
  skillCount: {
    position: 'absolute',
    right: 10,
    top: 3,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
});

export default SkillProgress;
