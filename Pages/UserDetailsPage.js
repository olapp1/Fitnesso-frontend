import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetRequests } from '../communication/network/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailsPage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
          const userId = await AsyncStorage.getItem('UserId');
          if (userId) {
            const response = await GetRequests.getUserDetailsById(userId, token);
            console.log('Response:', response); // Debugowanie odpowiedzi
            if (!response.ok) {
              throw new Error('Nie udało się pobrać danych użytkownika');
            }
            const data = await response.json();
            console.log('User Data:', data); // Debugowanie danych użytkownika
            setUserData(data);
          }
        }
      } catch (error) {
        console.error('Błąd pobierania danych użytkownika:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text>Ładowanie...</Text>;
  }

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

        {Object.entries(userData).map(([key, value]) => (
            <View style={styles.tile} key={key}>
              <Text style={styles.detailLabel}>{key}</Text>
              <Text style={styles.detailText}>{value}</Text>
            </View>
        ))}
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
  detailLabel: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 20,
    color: '#FFF',
    minHeight: 40,
  },
});

export default UserDetailsPage;


