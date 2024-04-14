import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { PutRequests } from '../communication/network/PutRequests'; // Importujemy funkcje do aktualizacji danych

const UpdateWorkerClassScreen = ({ route, navigation }) => {
    const { classId, onClassUpdated } = route.params; // Odczytujemy parametry przekazane przez nawigator
    const [className, setClassName] = useState('');
    const [instructor, setInstructor] = useState('');
    const [activePlace, setActivePlace] = useState('');
    const [maxPlace, setMaxPlace] = useState('');

    useEffect(() => {
        fetchClassDetails(); // Pobieramy szczegóły zajęcia przy pierwszym renderowaniu
    }, []);

    const fetchClassDetails = async () => {
        try {
            // Pobieramy szczegóły zajęcia o danym identyfikatorze
            const classDetails = await GetRequests.getWorkerClassDetails(Id);
            setClassName(classDetails.fitenssTypeClass.nameType);

            setActivePlace(classDetails.activePlace.toString());
            setMaxPlace(classDetails.maxPlace.toString());
        } catch (error) {
            console.error('Błąd podczas pobierania szczegółów zajęcia', error);
        }
    };

    const handleUpdateClass = async () => {
        try {
            const updatedClassData = {
                className,
                instructor,
                activePlace: parseInt(activePlace),
                maxPlace: parseInt(maxPlace)
            };

            const response = await PutRequests.updateWorkerClass(classId, updatedClassData);
            if (response) {
                Alert.alert('Sukces', 'Zajęcia zostały zaktualizowane pomyślnie.');
                onClassUpdated(); // Wywołujemy funkcję powrotu do listy zajęć po aktualizacji
                navigation.goBack(); // Powrót do poprzedniego ekranu
            } else {
                Alert.alert('Błąd', 'Nie udało się zaktualizować zajęć.');
            }
        } catch (error) {
            console.error('Błąd podczas aktualizacji zajęć', error);
            Alert.alert('Błąd', 'Wystąpił problem podczas aktualizacji zajęć.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nazwa zajęć:</Text>
            <TextInput
                style={styles.input}
                value={className}
                onChangeText={setClassName}
                placeholder="Wprowadź nazwę zajęć"
            />

            <Text style={styles.label}>Instruktor:</Text>
            <TextInput
                style={styles.input}
                value={instructor}
                onChangeText={setInstructor}
                placeholder="Wprowadź nazwę instruktora"
            />

            <Text style={styles.label}>Liczba zajętych miejsc:</Text>
            <TextInput
                style={styles.input}
                value={activePlace}
                onChangeText={setActivePlace}
                placeholder="Wprowadź liczbę zajętych miejsc"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Maksymalna liczba miejsc:</Text>
            <TextInput
                style={styles.input}
                value={maxPlace}
                onChangeText={setMaxPlace}
                placeholder="Wprowadź maksymalną liczbę miejsc"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateClass}>
                <Text style={styles.updateButtonText}>Aktualizuj zajęcia</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    updateButton: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default UpdateWorkerClassScreen;
