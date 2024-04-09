import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetRequests from '../communication/network/GetRequests'; 
import {DeleteRequests} from '../communication/network/DeleteRequests';

const AllReservationsScreen = () => {
  const [acceptedReservations, setAcceptedReservations] = useState([]);
  const [notAcceptedReservations, setNotAcceptedReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const accepted = await GetRequests.getUserAcceptedReservations(userId);
        const notAccepted = await GetRequests.getUserNotAcceptedReservations(userId);
        setAcceptedReservations(accepted || []);
        setNotAcceptedReservations(notAccepted || []);
      } else {
        console.log('UserId not found');
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    console.log(`Próba usunięcia rezerwacji o ID: ${reservationId}`);
    Alert.alert(
      'Potwierdzenie',
      'Czy na pewno chcesz usunąć tę rezerwację?',
      [
        {
          text: 'Anuluj',
          onPress: () => console.log('Anulowano usunięcie rezerwacji'),
          style: 'cancel',
        },
        { 
          text: 'Usuń', 
          onPress: async () => {
            try {
              const deleted = await DeleteRequests.deleteReservation(reservationId);
              if (deleted) {
                console.log(`Rezerwacja o ID: ${reservationId} została usunięta.`);
                fetchReservations(); 
              } else {
                console.log(`Nie udało się usunąć rezerwacji o ID: ${reservationId}.`);
              }
            } catch (error) {
              console.error(`Błąd podczas usuwania rezerwacji o ID: ${reservationId}:`, error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationText}>Data rezerwacji: {item.dataReservation}</Text>
      <Text style={styles.reservationText}>Typ zajęć: {item.fitnessClass.fitenssTypeClass.nameType}</Text>
      <Text style={styles.reservationText}>Data rozpoczęcia: {item.fitnessClass.startDate}</Text>
      <Text style={styles.reservationText}>Data zakończenia: {item.fitnessClass.endDate}</Text>
      <Text style={styles.reservationText}>Prowadzący: {item.fitnessClass.user.firstName} {item.fitnessClass.user.lastName}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zaakceptowane Rezerwacje</Text>
      <FlatList
        data={acceptedReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
      <Text style={styles.title}>Niezaakceptowane Rezerwacje</Text>
      <FlatList
        data={notAcceptedReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  reservationItem: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  reservationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#cccccc",
    width: "100%",
    marginVertical: 8,
  },
});

export default AllReservationsScreen;
