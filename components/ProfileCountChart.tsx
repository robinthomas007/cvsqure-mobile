
import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const MONTHS = ['jan-march', 'apr-june', 'july-sep', 'oct-dec']

const ProfileCountChart = ({ profileReport }: { profileReport: any }) => {

  const [chartData, setChartData] = useState({
    labels: MONTHS,
    datasets: [
      {
        data: [0],
      },
    ],
  });

  function sumGroupsOfThree(arr: Array<number>) {
    const result = [];

    for (let i = 0; i < arr.length; i += 3) {
      const group = arr.slice(i, i + 3);
      const sum = group.reduce((acc, val) => acc + val, 0);
      result.push(sum);
    }

    return result;
  }

  useEffect(() => {
    if (profileReport) {
      setChartData({
        labels: MONTHS,
        datasets: [
          {
            data: sumGroupsOfThree(profileReport.report.values) || [22, 20, 27, 22, 20, 27, 25, 23, 18, 26, 19, 21],
          },
        ],
      });
    }
  }, [profileReport]);

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
        <Text style={{ fontFamily: 'spartan-bold', fontSize: 20 }}>
          #Profile Count Chart
        </Text>
      </View>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 50}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(249, 148, 23, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default ProfileCountChart;
