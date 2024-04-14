import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import GetRequests from '../communication/network/GetRequests';
import { DeleteRequests } from '../communication/network/DeleteRequests';

const AllCustomerScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const customersData = await GetRequests.getAllCustomers();
            setCustomers(customersData || []);
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCustomer = async (userId) => {
        const confirmed = await confirmDeleteUser();

        if (confirmed) {
            const deleted = await DeleteRequests.deleteUser(userId);
            if (deleted) {
                Alert.alert(`Użytkownik o ID ${userId} został pomyślnie usunięty.`);
                await fetchCustomers(); // Odśwież listę po usunięciu użytkownika
            } else {
                Alert.alert('Nie udało się usunąć użytkownika.');
            }
        }
    };

    const confirmDeleteUser = async () => {
        return new Promise((resolve) => {
            Alert.alert(
                'Potwierdzenie',
                'Czy na pewno chcesz usunąć tego pracownika?',
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
        <View style={styles.customerItem}>
            <View>
                <Text style={styles.customerName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.customerEmail}>{item.email}</Text>
                <Text style={styles.customerLogin}>{item.login}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCustomer(item.id)}>
                <Text style={styles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <ActivityIndicator style={styles.centered} size="large" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
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
    customerItem: {
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
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    customerEmail: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5,
    },
    customerLogin: {
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
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        width: '100%',
    },
});

export default AllCustomerScreen;
