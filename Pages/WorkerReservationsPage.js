import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import GetRequests from '../communication/network/GetRequests';

const AllReservationsScreen = () => {
  const [reservations, setReservations] = useState({
    all: [],
    accepted: [],
    notAccepted: [],
  });
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // Dodany stan do zarządzania filtrem

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    // Zaktualizuj filtrację po zmianie filtra
    setFilteredReservations(reservations[filter]);
  }, [filter, reservations]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const [all, accepted, notAccepted] = await Promise.all([
        GetRequests.getAllReservations(),
        GetRequests.getAcceptedReservations(),
        GetRequests.getNotAcceptedReservations(),
      ]);
      setReservations({
        all: all || [],
        accepted: accepted || [],
        notAccepted: notAccepted || [],
      });
      setFilteredReservations(all || []); // Domyślnie wyświetl wszystkie rezerwacje
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationText}>Data rezerwacji: {item.dataReservation}</Text>
      <Text style={styles.reservationText}>Typ zajęć: {item.fitnessClass.fitenssTypeClass.nameType}</Text>
      <Text style={styles.reservationText}>Data rozpoczęcia: {item.fitnessClass.startDate}</Text>
      <Text style={styles.reservationText}>Data zakończenia: {item.fitnessClass.endDate}</Text>
      <Text style={styles.reservationText}>Prowadzący: {item.fitnessClass.user.firstName} {item.fitnessClass.user.lastName}</Text>
      
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Wszystkie" onPress={() => setFilter('all')} />
        <Button title="Zaakceptowane" onPress={() => setFilter('accepted')} />
        <Button title="Niezaakceptowane" onPress={() => setFilter('notAccepted')} />
      </View>
      <FlatList
        data={filteredReservations}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
