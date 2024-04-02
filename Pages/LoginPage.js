import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PostRequests } from '../communication/network/PostRequests';
import { GetRequests } from '../communication/network/GetRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Dodajemy stan dla użytkownika

  const handleLogin = async () => {
    try {
      const result = await PostRequests.logInUser(email, password);
      if (result.token) { // Sprawdź czy result zawiera token
        await AsyncStorage.setItem('Token', result.token); // Zapisz token w AsyncStorage
        console.log(result.token);

      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Error', 'An error occurred during the login process. Please try again later.');
    }
  };

  return (
      <View style={styles.container}>
        {user ? (
            <View>
              <Text style={styles.welcomeText}>{`Witaj, ${user}!`}</Text>
              <Button title="Pokaż szczegóły użytkownika" onPress={() => navigation.navigate('UserDetails')} />
            </View>
        ) : (
            <>
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
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
              />
              <Button
                  title="Log In"
                  onPress={handleLogin}
              />
            </>
        )}
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
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginPage;

