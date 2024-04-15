import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import GetRequests from '../communication/network/GetRequests';
import { DeleteRequests } from '../communication/network/DeleteRequests';

const AllEmployeesScreen = ({ navigation }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const employeesData = await GetRequests.getAllEmployee();
            setEmployees(employeesData || []);
        } catch (error) {
            console.error('Błąd podczas pobierania pracowników:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEmployee = async (userId) => {
        const confirmed = await confirmDeleteUser();
        if (confirmed) {
            const deleted = await DeleteRequests.deleteUser(userId);
            if (deleted) {
                Alert.alert(`Użytkownik o ID ${userId} został pomyślnie usunięty.`);
                await fetchEmployees(); 
            } else {
                Alert.alert('Nie udało się usunąć użytkownika ze wzgedu na prowadzone zajęcia.');
            }
        }
    };

    const confirmDeleteUser = async () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Potwierdzenie',
                'Czy na pewno chcesz usunąć tego pracownika?',
                [
                    { text: 'Anuluj', style: 'cancel', onPress: () => resolve(false) },
                    { text: 'Usuń', onPress: () => resolve(true) },
                ],
                { cancelable: false }
            );
        });
    };

    const handleAddUser = () => {
        navigation.navigate('AddEmployee');
    };

    const handleSortEmployees = () => {
        const sortedEmployees = [...employees].sort((a, b) => a.lastName.localeCompare(b.lastName));
        setEmployees(sortedEmployees);
    };

    const handleRefresh = () => {
        fetchEmployees();
    };

    const renderItem = ({ item }) => (
        <View style={styles.employeeItem}>
            <View>
                <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.employeeEmail}>{item.email}</Text>
                <Text style={styles.employeeLogin}>{item.login}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteEmployee(item.id)}>
                <Text style={styles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <ActivityIndicator style={styles.centered} size="large" />;
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 40 }}></View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                <Text style={styles.addButtonText}>Dodaj pracownika</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortButton} onPress={handleSortEmployees}>
                <Text style={styles.sortButtonText}>Sortuj alfabetycznie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Text style={styles.refreshButtonText}>Odśwież</Text>
            </TouchableOpacity>
            <FlatList
                data={employees}
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
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    employeeItem: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    employeeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    employeeEmail: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    employeeLogin: {
        fontSize: 14,
        color: 'darkgray',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    sortButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    refreshButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    refreshButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        width: '100%',
    },
});

export default AllEmployeesScreen;
