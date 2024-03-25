import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const UpdateUserPage = ({ route }) => {
  const { userId } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdateUser = () => {
    const userData = {
      firstName,
      lastName,
      email,
      login,
      password,
      phone,
    };

    fetch(`http://localhost:8080/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (response.ok) {
        Alert.alert("Aktualizacja danych użytkownika", "Dane użytkownika zostały zaktualizowane pomyślnie.");
      } else {
        throw new Error('Nie udało się zaktualizować danych użytkownika.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Aktualizacja danych użytkownika", "Wystąpił błąd podczas aktualizacji danych użytkownika.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktualizacja danych użytkownika</Text>
      <TextInput
        style={styles.input}
        placeholder="Nowe imię"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nowe nazwisko"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nowy email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nowy login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Nowe hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nowy numer telefonu"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Aktualizuj dane użytkownika" onPress={handleUpdateUser} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default UpdateUserPage;
