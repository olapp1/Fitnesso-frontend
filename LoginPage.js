import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logowanie z:', username, password);
    // Tutaj możesz dodać logikę logowania, np. sprawdzenie danych użytkownika
    // Po pomyślnym logowaniu można przekierować użytkownika do kolejnego ekranu, używając:
    // navigation.navigate('NazwaTwojegoEkranuPoLogowaniu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Ukrywa wpisywane hasło
      />
      <Button title="Zaloguj się" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginPage;
