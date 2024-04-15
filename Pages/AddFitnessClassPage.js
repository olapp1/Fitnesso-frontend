import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { PostRequests } from "../communication/network/PostRequests";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFitnessClassScreen = ({ navigation }) => {
    const [numberClass, setNumberClass] = useState('');
    const [fitenssTypeClass, setFitenssTypeClass] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));
    const [activePlace, setActivePlace] = useState('');
    const [maxPlace, setMaxPlace] = useState('');
    const [userId, setUserId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const id = await AsyncStorage.getItem('userId');
                if (id) {
                    setUserId(id);
                }
            } catch (error) {
                console.error('Error fetching userId:', error);
            }
        };
        fetchUserId();
    }, []);

    const handleAddFitnessClass = async () => {
        try {
            const newFitnessClass = {
                numberClass: parseInt(numberClass, 10),
                fitenssTypeClass: parseInt(fitenssTypeClass, 10),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                activePlace: parseInt(activePlace, 10),
                maxPlace: parseInt(maxPlace, 10),
                user: parseInt(userId, 10) 
            };

            const response = await PostRequests.addFitnessClass(newFitnessClass);

            if (response) {
                Alert.alert('Sukces', 'Nowe zajęcia zostały pomyślnie dodane!', [
                    { text: 'OK', onPress: () => navigation.navigate("AllClasses") }
                ]);
            } else {
                Alert.alert('Błąd', 'Nie udało się dodać zajęć.');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania zajęć:', error);
            Alert.alert('Błąd', 'Wystąpił błąd podczas dodawania zajęć. Popraw dane.');
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
    };

    return (
        <View style={styles.container}>
            
            <View style={{ marginTop: 40 }}>
                <Text style={styles.label}>Numer zajęć:</Text>
                <TextInput
                    style={styles.input}
                    value={numberClass}
                    onChangeText={(text) => setNumberClass(text)}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Id typu zajęć:</Text>
                <TextInput
                    style={styles.input}
                    value={fitenssTypeClass}
                    onChangeText={(text) => setFitenssTypeClass(text)}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Data rozpoczęcia:</Text>
                <TextInput
                    style={styles.input}
                    value={startDate}
                    onChangeText={(text) => setStartDate(text)}
                />

                <Text style={styles.label}>Data zakończenia:</Text>
                <TextInput
                    style={styles.input}
                    value={endDate}
                    onChangeText={(text) => setEndDate(text)}
                />

                <Text style={styles.label}>Liczba miejsc zarezerwowanych:</Text>
                <TextInput
                    style={styles.input}
                    value={activePlace}
                    onChangeText={(text) => setActivePlace(text)}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Maksymalna liczba uczestników:</Text>
                <TextInput
                    style={styles.input}
                    value={maxPlace}
                    onChangeText={(text) => setMaxPlace(text)}
                    keyboardType="numeric"
                />

                <Button title="Dodaj zajęcia" onPress={handleAddFitnessClass} />
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.cell}>ID</Text>
                    <Text style={styles.cell}>Typ zajęć</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>1</Text>
                    <Text style={styles.cell}>Joga</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>2</Text>
                    <Text style={styles.cell}>ABS</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>3</Text>
                    <Text style={styles.cell}>Workout leg</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>4</Text>
                    <Text style={styles.cell}>Stretch</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.cell}>5</Text>
                    <Text style={styles.cell}>Kickboxing</Text>
                </View>
            </View>
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
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    refreshButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightblue',
    },
    refreshButtonText: {
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 5,
        textAlign: 'center',
    },
});

export default AddFitnessClassScreen;
