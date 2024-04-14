import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

import {PostRequests} from "../communication/network/PostRequests";

const AddFitnessClassScreen = ({ navigation }) => {
    const [numberClass, setNumberClass] = useState('');
    const [fitenssTypeClass, setFitenssTypeClass] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activePlace, setActivePlace] = useState('');
    const [maxPlace, setMaxPlace] = useState('');

    const handleAddFitnessClass = async () => {
        try {
            const newFitnessClass = {
                numberClass: numberClass,
                fitenssTypeClass: fitenssTypeClass,
                startDate: startDate,
                endDate: endDate,
                activePlace: activePlace,
                maxPlace: maxPlace,
            };

            const response = await PostRequests.addFitnessClass(newFitnessClass);

            if (response) {
                Alert.alert('Success', 'New fitness class added successfully!');
                navigation.goBack(); // Powrót do poprzedniego ekranu po dodaniu zajęć
            } else {
                Alert.alert('Error', 'Failed to add fitness class.');
            }
        } catch (error) {
            console.error('Error adding fitness class:', error);
            Alert.alert('Error', 'An error occurred while adding fitness class.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Class Number:</Text>
            <TextInput
                style={styles.input}
                value={numberClass}
                onChangeText={(text) => setNumberClass(text)}
            />

            <Text style={styles.label}>Class Type:</Text>
            <TextInput
                style={styles.input}
                value={fitenssTypeClass}
                onChangeText={(text) => setFitenssTypeClass(text)}
            />

            <Text style={styles.label}>Start Date:</Text>
            <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={(text) => setStartDate(text)}
            />

            <Text style={styles.label}>End Date:</Text>
            <TextInput
                style={styles.input}
                value={endDate}
                onChangeText={(text) => setEndDate(text)}
            />

            <Text style={styles.label}>Active Places:</Text>
            <TextInput
                style={styles.input}
                value={activePlace}
                onChangeText={(text) => setActivePlace(text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Max Places:</Text>
            <TextInput
                style={styles.input}
                value={maxPlace}
                onChangeText={(text) => setMaxPlace(text)}
                keyboardType="numeric"
            />

            <Button title="Add Fitness Class" onPress={handleAddFitnessClass} />
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
});

export default AddFitnessClassScreen;
