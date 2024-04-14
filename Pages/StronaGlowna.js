import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logoutUser} from "../communication/network/AuthRequest";
const ThreeButtonsScreen = () => {
    //const [accountTypeId, setAccountTypeId] = useState(1);
    const [idTypAccount, setIdTypAccount] = useState(null);
    const navigation = useNavigation();
    const backgroundImage = require('../assets/pexels-lukas-669577.jpg');

    const handleLogout = async () => {
        try {
            await logoutUser(); // Wywołaj funkcję logoutUser do wylogowania użytkownika
            navigation.navigate('Home'); // Przykład przekierowania na ekran główny w react-navigation
        } catch (error) {
            console.error('Błąd podczas wylogowywania:', error);

        }
    };


    useEffect(() => {
        const getIdTypAccount = async () => {
            try {
                const storedIdTypAccount = await AsyncStorage.getItem('idTypAccount');
                if (storedIdTypAccount) {
                    setIdTypAccount(parseInt(storedIdTypAccount, 10));
                }
            } catch (error) {
                console.error('Error getting idTypAccount:', error);
            }
        };

        getIdTypAccount(); // Wywołaj funkcję wczytującą idTypAccount przy pierwszym renderowaniu
    }, []);

    const renderButtonsBasedOnAccountType = () => {
        switch (idTypAccount) {
            case 2:
                return (
                    <>
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllEmployee')}>
                            <Text style={styles.buttonText}>Pracownicy</Text>
                        </TouchableOpacity>

                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerReservations')}>
                            <Text style={styles.buttonText}>Rezerwacje</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
                            <Text style={styles.buttonText}>Użytkownicy</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerClasses')}>
                            <Text style={styles.buttonText}>Zajęcia</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Wyloguj się</Text>
                        </TouchableOpacity>
                    </>
                );
            case 1:
                return (
                    <>
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllReservations')}>
                            <Text style={styles.buttonText}>Rezerwacje</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllClasses')}>
                            <Text style={styles.buttonText}>Zajęcia</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Wyloguj się</Text>
                        </TouchableOpacity>
                    </>
                );
            case 3:
                return (
                    <>
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerReservations')}>
                            <Text style={styles.buttonText}>Rezerwacje</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('AllCustomer')}>
                            <Text style={styles.buttonText}>Użytkownicy</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('WorkerClasses')}>
                            <Text style={styles.buttonText}>Zajęcia</Text>
                        </TouchableOpacity>
                        <View style={styles.spacing} />
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Wyloguj się</Text>
                        </TouchableOpacity>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
            {renderButtonsBasedOnAccountType()}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: 'red', // Kolor czerwony dla przycisku wylogowania
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    spacing: {
        height: 20,
    },
});

export default ThreeButtonsScreen;

