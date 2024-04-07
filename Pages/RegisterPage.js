import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { PostRequests } from '../communication/network/PostRequests';

const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{9}$/;
    return re.test(phone);
  };

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !login || !password || !phone) {
      Alert.alert("Błąd", "Wszystkie pola muszą być wypełnione.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Błąd", "Niepoprawny format adresu email.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Błąd", "Hasło musi zawierać co najmniej 6 znaków.");
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert("Błąd", "Numer telefonu musi składać się z 9 cyfr.");
      return;
    }

    PostRequests.registerUser(firstName, lastName, login, email, password, phone)
      .then(response => {
        Alert.alert("Sukces", "Rejestracja przebiegła pomyślnie.");
        navigation.navigate('Login'); // Upewnij się, że 'Login' odpowiada nazwie ekranu logowania w Twoim Stack Navigatorze.
      })
      .catch(error => {
        // W praktyce tutaj powinieneś wyświetlić bardziej szczegółowy komunikat błędu zwrócony przez serwer, jeśli to możliwe
        Alert.alert("Błąd rejestracji", "Wystąpił problem podczas rejestracji. Spróbuj ponownie.");
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <TextInput style={styles.input} placeholder="Imię" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nazwisko" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Nazwa użytkownika" value={login} onChangeText={setLogin} />
      <TextInput style={styles.input} placeholder="Hasło" secureTextEntry={true} value={password} onChangeText={setPassword} />
      <TextInput
        style={styles.input}
        placeholder="Numer telefonu"
        keyboardType="numeric"  
        value={phone}
        onChangeText={setPhone}
        maxLength={9}  
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>

      <View style={styles.loginPrompt}>
        <Text style={styles.loginPromptText}>Masz konto? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginPromptLink}>Zaloguj się!</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginPrompt: {
    flexDirection: 'row', 
    marginTop: 20, 
  },
  loginPromptText: {
    fontSize: 16, 
    color: 'gray', 
  },
  loginPromptLink: {
    fontSize: 16, 
    color: '#007BFF', 
    fontWeight: 'bold', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RegisterPage;
