import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Alert  } from 'react-native';
import { PutRequests } from '../communication/network/PutRequests';
import GetRequests from '../communication/network/GetRequests';

const AllReservationsScreen = () => {
  const [reservations, setReservations] = useState({
    all: [],
    accepted: [],
    notAccepted: [],
  });
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    
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
      setFilteredReservations(all || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptReservation = async (reservationId) => {
    try {
      await PutRequests.acceptReservation(reservationId);
      
      fetchReservations(); 
  
      Alert.alert(
        "Rezerwacja zaakceptowana",
        `Rezerwacja o ID ${reservationId} została pomyślnie zaakceptowana.`,
        [
          { text: "OK", onPress: () => {} } 
        ]
      );
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };
  
  
  const acceptAllReservations = async () => {
    try {
      await PutRequests.acceptAllReservations();
      
      fetchReservations();
  
      Alert.alert(
        "Wszystkie rezerwacje zaakceptowane",
        "Wszystkie rezerwacje zostały pomyślnie zaakceptowane.",
        [
          { text: "OK", onPress: () => {} } 
        ]
      );
    } catch (error) {
      console.error('Error accepting all reservations:', error);
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.reservationText}>Data rezerwacji: {item.dataReservation}</Text>
      <Text style={styles.reservationText}>Typ zajęć: {item.fitnessClass.fitenssTypeClass.nameType}</Text>
      <Text style={styles.reservationText}>Data rozpoczęcia: {item.fitnessClass.startDate}</Text>
      <Text style={styles.reservationText}>Data zakończenia: {item.fitnessClass.endDate}</Text>
      <Text style={styles.reservationText}>Prowadzący: {item.fitnessClass.user.firstName} {item.fitnessClass.user.lastName}</Text>
      {!item.isPurchased && (
      <TouchableOpacity style={styles.acceptButton} onPress={() => acceptReservation(item.id)}>
      <Text style={styles.buttonText}>Akceptuj</Text>
    </TouchableOpacity>
    )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Wszystkie" onPress={() => setFilter('all')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="Zaakceptowane" onPress={() => setFilter('accepted')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="Niezaakceptowane" onPress={() => setFilter('notAccepted')} />
        <View style={styles.buttonSpacing}></View>
        <TouchableOpacity style={styles.acceptButton} onPress={acceptAllReservations}>
          <Text style={styles.buttonText}>Akceptuj wszystkie rezerwacje</Text>
        </TouchableOpacity>
        
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
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonSpacing: {
    height: 10, 
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
  buttonsContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default AllReservationsScreen;
