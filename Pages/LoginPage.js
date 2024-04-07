import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
          // Możesz tutaj dodać automatyczne przekierowanie, jeśli token jest dostępny
          // navigation.navigate('UserDetails');
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

        // Pobierz ID użytkownika na podstawie adresu e-mail
        const userIdResponse = await GetRequests.getUserIdByEmail(email);
        if (userIdResponse) {
          console.log('User ID:', userIdResponse[0]); // Pierwsza cyfra jako ID użytkownika
          console.log('User Type:', userIdResponse[1]); // Druga cyfra jako typ konta

          // Zapisz token i ID użytkownika do pamięci
          await AsyncStorage.setItem('userToken', result.token);
          await AsyncStorage.setItem('userId', userIdResponse[0].toString());

          // Przekieruj do UserDetailsPage
          navigation.navigate('UserDetails');
        } else {
          console.error('User ID not found');
        }
      } else {
        Alert.alert('Logowanie nieudane', 'Nieprawidłowy e-mail lub hasło. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Błąd logowania:', error.message);
      Alert.alert('Błąd logowania', 'Wystąpił błąd podczas procesu logowania. Spróbuj ponownie później.');
    }
  };

  return (
    <View style={styles.container}>
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
      <Button
        title="Zaloguj się"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginPage;
