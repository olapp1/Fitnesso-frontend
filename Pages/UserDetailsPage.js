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
import GetRequests from '../communication/network/GetRequests';
import {PutRequests} from '../communication/network/PutRequests';


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
          const response = await GetRequests.getUserDetailsById(userId, token);
          setUserData(response);
        } else {
          Alert.alert("Błąd", "Nie można załadować szczegółów użytkownika.");
        }
      } catch (error) {
        console.error('Błąd podczas pobierania szczegółów użytkownika:', error);
        Alert.alert("Błąd", "Nie można załadować szczegółów użytkownika.");
      }
    };
  
    fetchUserDetails();
  }, []);
  
  const handleUpdate = (key, value) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [key]: value,
    }));
  };
    
  const handleSaveChanges = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      if (!userId || !token) {
        Alert.alert("Błąd", "Nie znaleziono tokenu lub ID użytkownika.");
        return;
      }
  
      const updatedUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        login: userData.login,
        phone: userData.phone,
      };
  
      const response = await PutRequests.updateUser(userId, updatedUserData, token);
      if (response && response.id) {
        Alert.alert("Sukces", "Dane użytkownika zostały zaktualizowane.");
      } else {
        Alert.alert("Błąd", "Nie udało się zaktualizować danych. Sprawdź logi dla szczegółów.");
      }
    } catch (error) {
      console.error('Błąd aktualizacji danych użytkownika:', error);
      Alert.alert("Błąd", "Nie można zaktualizować danych użytkownika.");
    }
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
          onPress={() => navigation.navigate('StronaGlowna')} 
        >
          <Text style={styles.navButtonText}>Strona główna</Text>
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
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
  <Text style={styles.buttonText}>Zapisz zmiany</Text>
</TouchableOpacity>

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
  }
  
});

export default UserDetailsPage;
