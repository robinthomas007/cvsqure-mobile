import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios'
import { Card, Avatar, Button } from 'react-native-elements';
import Header from '@/components/EmployeeList/header';
import EmployeeCard from '@/components/EmployeeList/EmployeeCard';
import { token } from '@/components/token'

const getNameAlias = (name: string) => {
  return name.split(' ').map(part => part[0]).join('');
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const EmployeeList = () => {
  const [employees, setEmployees] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const [q, setQ] = React.useState<string>('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false,
  });

  const setSearch = (val: string) => {
    if (val.length > 2) {
      setQ(val)
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: 1,
      }));
    }
    if (val.length === 0) {
      setQ('')
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: 1,
      }));
    }
  }

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        if (token) {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/admin/users?q=${q}&page=${pagination.current}&limit=${pagination.pageSize}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (pagination.current !== 1) {
            setEmployees((prevEmployees: any) => [...prevEmployees, ...response.data?.users]);
          } else {
            setEmployees(response.data?.users);
          }

          setPagination((prevPagination) => ({
            ...prevPagination,
            total: response.data?.total_records,
          }));
        }
      } catch (error) {
        console.error('Error fetching profile222:', error);
      } finally {
        setLoading(false);
      }

    };

    fetchEmployee();
  }, [pagination.current, q]);

  const loadMoreData = () => {

    if (!loading && employees.length < pagination.total) {
      console.log("came here")
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: pagination.current + 1,
      }));
    }
  };

  return (
    <View>
      <Header setSearch={setSearch} />
      <View style={{ backgroundColor: '#f3f3f3', borderRadius: 30, marginTop: -26 }}>
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          renderItem={({ item }) => <EmployeeCard employee={item} />}
          contentContainerStyle={styles.container}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
          </View>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 200,
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
    // textAlign: 'center',
    marginTop: 10,
  },
  profession: {
    fontSize: 16,
    color: '#555',
    // textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#777',
    // textAlign: 'center',
  },
  skills: {
    fontSize: 14,
    color: '#777',
    // textAlign: 'center',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: '#888',
    // textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#ffffff40',
  },
});

export default EmployeeList;
