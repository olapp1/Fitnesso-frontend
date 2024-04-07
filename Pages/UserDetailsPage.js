import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserDetailsPage = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    login: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');
        if (userId && token) {
          const response = await axios.get(`http://192.168.0.13:8080/api/v1/users/${userId}/details`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            login: response.data.login,
            phone: response.data.phone,
          });
        } else {
          Alert.alert("Błąd", "Nie znaleziono tokenu lub ID użytkownika.");
        }
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów użytkownika:', error);
        Alert.alert("Błąd", "Nie można załadować szczegółów użytkownika.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ImageBackground
      source={require('../assets/content-pixie-be-6rpnQ30k-unsplash.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Reservations')} 
        >
          <Text style={styles.navButtonText}>Rezerwacje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Oferta')} 
        >
          <Text style={styles.navButtonText}>Oferta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Szczegóły użytkownika</Text>
      <View style={styles.tile}>
        <TextInput 
          style={styles.detailText} 
          value={userData.firstName} 
          onChangeText={(text) => handleUpdate('firstName', text)} 
        />
      </View>
      <View style={styles.tile}>
        <TextInput 
          style={styles.detailText} 
          value={userData.lastName} 
          onChangeText={(text) => handleUpdate('lastName', text)} 
        />
      </View>
      <View style={styles.tile}>
        <TextInput 
          style={styles.detailText} 
          value={userData.email} 
          onChangeText={(text) => handleUpdate('email', text)} 
        />
      </View>
      <View style={styles.tile}>
        <TextInput 
          style={styles.detailText} 
          value={userData.login} 
          onChangeText={(text) => handleUpdate('login', text)} 
        />
      </View>
      <View style={styles.tile}>
        <TextInput 
          style={styles.detailText} 
          value={userData.phone} 
          onChangeText={(text) => handleUpdate('phone', text)} 
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  navButton: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tile: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 20,
    color: '#FFF',
    minHeight: 40,
  },
});

export default UserDetailsPage;
