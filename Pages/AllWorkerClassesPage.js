import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import GetRequests from '../communication/network/GetRequests';
import DeleteRequests from '../communication/network/DeleteRequests';

const WorkerClassesScreen = () => {
    const [workerClasses, setWorkerClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); 

    useEffect(() => {
        fetchWorkerClasses();
    }, []);

    const fetchWorkerClasses = async () => {
        setLoading(true);
        try {
            const classesData = await GetRequests.getAllWorkerClasses();
            setWorkerClasses(classesData || []);
        } catch (error) {
            console.error('Błąd podczas pobierania zajęć pracowniczych', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClass = async (id) => {
        try {
            navigation.navigate('UpdateWorkerClass', { Id: id, onClassUpdated: fetchWorkerClasses });
        } catch (error) {
            console.error('Błąd podczas aktualizacji zajęcia', error);
        }
    };

    const handleDeleteClass = async (classId) => {
        const confirmed = await confirmDeleteClass();
    
        if (confirmed) {
            try {
                const deleted = await DeleteRequests.deleteClass(classId);
                if (deleted) {
                    Alert.alert(`Class with ID ${classId} successfully deleted.`);
                    fetchWorkerClasses();  // Refresh the list after deletion
                } else {
                    Alert.alert('Failed to delete class.');
                }
            } catch (error) {
                console.error('Error during class deletion', error);
            }
        }
    };
    

    const confirmDeleteClass = async () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Potwierdzenie',
                'Czy na pewno chcesz usunąć te zajęcia?',
                [
                    {
                        text: 'Anuluj',
                        style: 'cancel',
                        onPress: () => resolve(false),
                    },
                    {
                        text: 'Usuń',
                        onPress: () => resolve(true),
                    },
                ],
                { cancelable: false }
            );
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.classItem}>
            <Text style={styles.className}>{item.fitenssTypeClass.nameType}</Text>
            <Text style={styles.classInfo}>{`Data rozpoczęcia: ${item.startDate}`}</Text>
            <Text style={styles.classInfo}>{`Data zakończenia: ${item.endDate}`}</Text>
            <Text style={styles.classInfo}>{`Miejsce: ${item.activePlace}/${item.maxPlace}`}</Text>
            <Text style={styles.classInfo}>{`Prowadzący: ${item.user.firstName} ${item.user.lastName}`}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateClass(item.id)}>
                    <Text style={styles.buttonText}>Edytuj</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteClass(item.id)}>
                    <Text style={styles.buttonText}>Usuń</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleAddNewClass = () => {
        navigation.navigate('AddFitnessClass');
    };

    if (loading) {
        return <ActivityIndicator style={styles.centered} size="large" />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddNewClass}>
                <Text style={styles.addButtonText}>Dodaj nowe zajęcia</Text>
            </TouchableOpacity>
            <FlatList
                data={workerClasses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    classItem: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    classInfo: {
        fontSize: 14,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    updateButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});

export default WorkerClassesScreen;
