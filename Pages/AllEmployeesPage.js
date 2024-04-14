import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import GetRequests from '../communication/network/GetRequests';


const AllEmployeesScreen = () => {
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

    const renderItem = ({ item }) => (
        <View style={styles.employeeItem}>
            <Text style={styles.employeeName}>{item.firstName} {item.lastName}</Text>
            <Text style={styles.employeeEmail}>{item.email}</Text>
            <Text style={styles.employeeLogin}>{item.login}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator style={styles.centered} size="large" />;
    }

    return (
        <View style={styles.container}>
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
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
    employeeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    employeeEmail: {
        fontSize: 16,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#cccccc',
        width: '100%',
        marginVertical: 8,
    },
});

export default AllEmployeesScreen;



