import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const AcceptedReservationsPage = () => {
  const [acceptedReservations, setAcceptedReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/reservations/accepted', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YourBearerTokenHere', // Zastąp 'YourBearerTokenHere' swoim rzeczywistym tokenem
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setAcceptedReservations(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista zaakceptowanych rezerwacji</Text>
      <FlatList
        data={acceptedReservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <Text>Nazwa: {item.name}</Text>
            <Text>Data: {item.date}</Text>
            <Text>Godzina: {item.time}</Text>
            {/* Dodaj inne informacje o rezerwacji, jeśli są dostępne */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  reservationItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AcceptedReservationsPage;
