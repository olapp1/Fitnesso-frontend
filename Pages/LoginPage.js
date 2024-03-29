import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PostRequests } from '../communication/network/PostRequests';
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
        console.log(result.token); //wyswietla toke w consoli pzregladr 
        setUser(email); //uzżwała do komunikatu przwitania
      } else {
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
      Alert.alert('Login Error', 'An error occurred during the login process.');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.welcomeText}>{`Witaj, ${user}!`}</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Log In" onPress={handleLogin} />
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


