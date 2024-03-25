import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const UserDetailsPage = ({ route }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/users/${userId}/details`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YourBearerTokenHere', // Zastąp 'YourBearerTokenHere' swoim rzeczywistym tokenem
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setUserData(data);
      setLoading(false);
    })
    .catch(error => console.error('Error:', error));
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
      {userData && (
        <>
          <Text style={styles.title}>Szczegóły użytkownika</Text>
          <Text>Imię: {userData.firstName}</Text>
          <Text>Nazwisko: {userData.lastName}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Login: {userData.login}</Text>
          <Text>Telefon: {userData.phone}</Text>
        </>
      )}
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
  loadingContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UserDetailsPage;
