import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PostRequests } from '../communication/network/PostRequests';
import GetRequests from '../communication/network/GetRequests';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          console.log('Token found:', token);
        } else {
          console.log('Token not found');
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const result = await PostRequests.logInUser(email, password);
      if (result.token) {
        console.log('Token:', result.token);
    
        const userIdResponse = await GetRequests.getUserIdByEmail(email);
        if (userIdResponse) {
          console.log('User ID:', userIdResponse[0]);
    
          await AsyncStorage.setItem('userToken', result.token);
          await AsyncStorage.setItem('userId', userIdResponse[0].toString());
    
          navigation.navigate('UserDetails', { userId: userIdResponse[0].toString() });
        } else {
          console.error('User ID not found');
        }
      } else {
        Alert.alert('Logowanie nieudane', 'Podano nieprawidłowy e-mail lub hasło. Spróbuj ponownie.');
      }
    } catch (error) {
        Alert.alert('Logowanie nieudane', 'Podano nieprawidłowy e-mail lub hasło. Spróbuj ponownie.');
      
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Rejestracja</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },

  loginButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#6c757d',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginPage;
