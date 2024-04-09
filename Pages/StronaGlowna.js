import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const ThreeButtonsScreen = () => {
  const [accountTypeId, setAccountTypeId] = useState(1);
  const navigation = useNavigation();
  const backgroundImage = require('../assets/pexels-lukas-669577.jpg');

  const renderButtonsBasedOnAccountType = () => {
    switch (accountTypeId) {
      case 2:
        return (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllEmployee')}>
              <Text style={styles.buttonText}>Pracownicy</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllReservations')}>
              <Text style={styles.buttonText}>Rezerwacje</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
              <Text style={styles.buttonText}>Użytkownicy</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllClasses')}>
              <Text style={styles.buttonText}>Zajęcia</Text>
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
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Reservations')}>
              <Text style={styles.buttonText}>Rezerwacje</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
              <Text style={styles.buttonText}>Użytkownicy</Text>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllClasses')}>
              <Text style={styles.buttonText}>Zajęcia</Text>
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
