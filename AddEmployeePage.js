import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddEmployeePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddEmployee = () => {
    const employeeData = {
      firstName,
      lastName,
      email,
      login,
      password,
      phone,
    };

    fetch('http://localhost:8080/api/v1/users/addEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    })
    .then(response => {
      if (response.ok) {
        Alert.alert("Dodawanie pracownika", "Pracownik został dodany pomyślnie.");
      } else {
        throw new Error('Nie udało się dodać pracownika.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Dodawanie pracownika", "Wystąpił błąd podczas dodawania pracownika.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodawanie pracownika</Text>
      <TextInput
        style={styles.input}
        placeholder="Imię"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwisko"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Numer telefonu"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Dodaj pracownika" onPress={handleAddEmployee} />
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

export default AddEmployeePage;
