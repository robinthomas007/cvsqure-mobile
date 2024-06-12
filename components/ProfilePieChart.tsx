import React, { useEffect, useRef } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const ProfilePieChart = ({ profileReport }: { profileReport: any }) => {
  const chartData = [
    {
      name: 'Approved',
      population: profileReport?.profileStatusCount?.approved || 0,
      color: '#4CB140',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Submitted',
      population: profileReport?.profileStatusCount?.submitted || 0,
      color: '#519DE9',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Pending',
      population: Math.abs(profileReport?.profileStatusCount?.submitted - profileReport?.profileStatusCount?.total) || 0,
      color: '#EF9234',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Edit Request',
      population: profileReport?.profileStatusCount?.edit_requested || 0,
      color: '#dcd52c',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Rejected',
      population: profileReport?.profileStatusCount?.rejected || 0,
      color: '#C9190B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text style={{ fontFamily: 'spartan-bold', fontSize: 20 }}>
          #Profile Status Data
        </Text>
      </View>
      <View style={{ backgroundColor: '#fff' }}>
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - 50}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </View>
  );
};

export default ProfilePieChart;
