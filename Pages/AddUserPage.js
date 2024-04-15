import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PostRequests } from '../communication/network/PostRequests';

const AddUserScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
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

    const handleAddEmployee = async () => {
        try {
            if (!firstName.trim() || !lastName.trim() || !login.trim() || !email.trim() || !password.trim() || !phone.trim()) {
                Alert.alert('Błąd', 'Wszystkie pola są wymagane.');
                return;
            }

            if (password.length < 6) {
                Alert.alert('Błąd', 'Hasło musi mieć co najmniej 6 znaków.');
                return;
            }

            if (!validateEmail(email)) {
                Alert.alert('Błąd', 'Podaj poprawny adres email.');
                return;
            }

            if (!validatePhone(phone)) {
                Alert.alert('Błąd', 'Podaj poprawny numer telefonu.');
                return;
            }

            const userData = await PostRequests.registerEmployee(
                firstName,
                lastName,
                login,
                email,
                password,
                phone
            );

            Alert.alert('Sukces', 'Dodano pracownika pomyślnie.');

            setFirstName('');
            setLastName('');
            setLogin('');
            setEmail('');
            setPassword('');
            setPhone('');
        } catch (error) {
            Alert.alert('Błąd', 'Nie udało się dodać pracownika. Spróbuj ponownie.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dodaj nowego pracownika</Text>
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
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
                placeholder="Telefon"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
                <Text style={styles.buttonText}>Dodaj pracownika</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddUserScreen;
