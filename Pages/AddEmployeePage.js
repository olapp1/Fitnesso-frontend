import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AddEmployeePage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const validatePhone = phone => {
    const re = /^\d{9,}$/;  
    return re.test(phone);
  };
  

  const handleAddEmployee = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !login.trim() || !password.trim() || !phone.trim()) {
      Alert.alert("Błąd", "Wszystkie pola muszą być wypełnione.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Błąd", "Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Błąd", "Podaj poprawny adres email.");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Błąd", "Podaj poprawny numer telefonu.");
      return;
    }

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
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Alert.alert("Dodawanie pracownika", "Pracownik został dodany pomyślnie.", [
          {text: 'OK', onPress: () => navigation.navigate('AllEmployees')}
        ]);
      } else {
        throw new Error(data.message || 'Nie udało się dodać pracownika.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Alert.alert("Dodawanie pracownika", error.message || "Wystąpił błąd podczas dodawania pracownika.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dodawanie pracownika</Text>
      <TextInput style={styles.input} placeholder="Imię" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nazwisko" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nazwa użytkownika" value={login} onChangeText={setLogin} />
      <TextInput style={styles.input} placeholder="Hasło" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Numer telefonu" value={phone} onChangeText={setPhone} />
      <Button
  title="Dodaj pracownika"
  onPress={handleAddEmployee}
  disabled={
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !login.trim() ||
    !password.trim() ||
    !phone.trim() ||
    password.length < 6 ||
    !validateEmail(email) ||
    !validatePhone(phone)
  }
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
