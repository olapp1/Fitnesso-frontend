import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import GetRequests from '../communication/network/GetRequests';
import { PostRequests } from '../communication/network/PostRequests';

const ActiveFitnessClassesPage = () => {
  const [userTypeId, setUserTypeId] = useState(1); // Pobierz ten stan na podstawie zalogowanego użytkownika
  const [activeClassesWithVacancies, setActiveClassesWithVacancies] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classesPastEndDate, setClassesPastEndDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('activeClassesWithVacancies');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const activeClassesWithVacanciesData = await GetRequests.getActiveClassesWithVacancies();
      const classesData = await GetRequests.getActiveFitnessClasses();
      const classesPastEndDateData = await GetRequests.getClassesPastEndDate();
      setActiveClassesWithVacancies(activeClassesWithVacanciesData || []);
      setClasses(classesData || []);
      setClassesPastEndDate(classesPastEndDateData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reserveClass = async (classId) => {
    try {
      
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.log('Nie znaleziono userId zalogowanego użytkownika');
        return;
      }
  
      
      console.log(`Sending reservation request for userId: ${userId}, classId: ${classId}`);
  
      
      const result = await PostRequests.reserveClass(userId, classId);
      if (result) {
        Alert.alert(
          "Rezerwacja dodana",
          "Twoja rezerwacja została pomyślnie dodana.",
          [
            { text: "OK", onPress: () => fetchData() } 
          ]
        );
    
      } else {
        console.log('Nie udało się dodać rezerwacji');
      }
    } catch (error) {
      console.error('Błąd podczas rezerwacji:', error);
    }
  };

  const renderItem = ({ item }) => {
    const now = new Date();
    const endDate = new Date(item.endDate);
    const isPast = endDate < now;
    const availablePlaces = item.maxPlace - item.activePlace;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Typ zajęć: {item.fitenssTypeClass ? item.fitenssTypeClass.nameType : 'No data'}</Text>
        <Text style={styles.text}>Początek: {item.startDate}</Text>
        <Text style={styles.text}>Koniec: {item.endDate}</Text>
        <Text style={styles.text}>Zajęte miejsca: {item.activePlace}</Text>
        <Text style={styles.text}>Maksymalna liczba miejsc: {item.maxPlace}</Text>
        <Text style={styles.text}>Instruktor: {item.user ? `${item.user.firstName} ${item.user.lastName}` : 'No data'}</Text>
        <View style={styles.buttonsContainer}>
          {userTypeId === 2 || userTypeId === 3 ? (
            <>
              <TouchableOpacity style={styles.button} onPress={() => console.log(`Edit class ID: ${item.id}`)}>
                <Text style={styles.buttonText}>Edytuj</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => console.log(`Delete class ID: ${item.id}`)}>
                <Text style={styles.buttonText}>Usuń</Text>
              </TouchableOpacity>
            </>
          ) : null}
          {!isPast && availablePlaces > 0 && userTypeId === 1 ? (
            <TouchableOpacity style={styles.button} onPress={() => reserveClass(item.id)}>
              <Text style={styles.buttonText}>Zarezerwuj</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  if (loading) {
    return <View style={[styles.container, styles.loadingContainer]}><ActivityIndicator size="large" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Aktywne zapisy na zajęcia" onPress={() => setCurrentView('activeClassesWithVacancies')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="W pełni zarezerwowane zajęcia" onPress={() => setCurrentView('classes')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="Historia zajęć" onPress={() => setCurrentView('classesPastEndDate')} />
      </View>
      <FlatList
        data={currentView === 'activeClassesWithVacancies' ? activeClassesWithVacancies : currentView === 'classes' ? classes : classesPastEndDate}
        keyExtractor={(item, index) => `${currentView}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonSpacing: {
    height: 10, // Ustawienie wysokości na 10 dla odstępu między przyciskami
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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

export default ActiveFitnessClassesPage;
