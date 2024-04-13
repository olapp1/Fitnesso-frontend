import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import GetRequests from '../communication/network/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThreeButtonsScreen = () => {
  const [accountTypeId, setAccountTypeId] = useState(null);
  const navigation = useNavigation();
  const backgroundImage = require('../assets/pexels-lukas-669577.jpg');

  useEffect(() => {
    const fetchAccountType = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');  // Make sure the key here matches exactly how it's stored
        if (!userId) {
          console.error('User ID is not available');
          return;
        }
        const userDetails = await GetRequests.getUserDetailsById(userId);
        if (userDetails && userDetails.accountTypeId) {
          setAccountTypeId(userDetails.accountTypeId);
        } else {
          console.error('Failed to retrieve account type ID');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchAccountType();
  }, []);

  const renderButtonsBasedOnAccountType = () => {
    switch (accountTypeId) {
      case 2:
        return (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllEmployee')}>
              <Text style={styles.buttonText}>Zarządzanie pracownikami</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerReservations')}>
              <Text style={styles.buttonText}>Zarządzanie rezerwacjami</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
              <Text style={styles.buttonText}>Zarządzanie użytkownikami</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerClasses')}>
              <Text style={styles.buttonText}>Zarządzanie zajęciami</Text>
            </TouchableOpacity>
          </>
        );
      case 1:
        return (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllReservations')}>
              <Text style={styles.buttonText}>Rezerwacje</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllClasses')}>
              <Text style={styles.buttonText}>Zajęcia</Text>
            </TouchableOpacity>
          </>
        );
      case 3:
        return (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerReservations')}>
              <Text style={styles.buttonText}>Zarządzanie rezerwacjami</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
              <Text style={styles.buttonText}>Zarządzanie użytkownikami</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerClasses')}>
              <Text style={styles.buttonText}>Zarządzanie zajęciami</Text>
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      {renderButtonsBasedOnAccountType()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  spacing: {
    height: 20,
  },
});

export default ThreeButtonsScreen;
