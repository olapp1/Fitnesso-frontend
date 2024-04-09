import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import GetRequests from '../communication/network/GetRequests';
import { PostRequests } from '../communication/network/PostRequests';
import { Alert } from 'react-native';

const ActiveFitnessClassesPage = () => {
  const [userTypeId, setUserTypeId] = useState(1);
  const [activeClassesWithVacancies, setActiveClassesWithVacancies] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classesPastEndDate, setClassesPastEndDate] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => { // Definicja funkcji fetchData
    setLoading(true);
    try {
      const activeClassesWithVacanciesData = await GetRequests.getActiveClassesWithVacancies();
      const classesData = await GetRequests.getActiveFitnessClasses();
      const classesPastEndDateData = await GetRequests.getClassesPastEndDate();

      setActiveClassesWithVacancies(activeClassesWithVacanciesData);
      setClasses(classesData);
      setClassesPastEndDate(classesPastEndDateData);
    } catch (error) {
      console.error('Błąd podczas ładowania danych:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const activeClassesWithVacanciesData = await GetRequests.getActiveClassesWithVacancies();
      const classesData = await GetRequests.getActiveFitnessClasses();
      const classesPastEndDateData = await GetRequests.getClassesPastEndDate();
      
      if (classesData) setClasses(classesData);
      if (classesPastEndDateData) setClassesPastEndDate(classesPastEndDateData);
      if (activeClassesWithVacanciesData) setActiveClassesWithVacancies(activeClassesWithVacanciesData);
      setLoading(false);
    };

    fetchData();
  }, []);

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
            { text: "OK", onPress: () => fetchData() } // Ponowne wywołanie funkcji fetchData
          ]
        );
    
      } else {
        console.log('Nie udało się dodać rezerwacji');
      }
    } catch (error) {
      console.error('Błąd podczas rezerwacji:', error);
    }
  };
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const now = new Date();
    const endDate = new Date(item.endDate);
    const isPast = endDate < now;
    const availablePlaces = item.maxPlace - item.activePlace;
  
    return (
      <View style={styles.itemContainer}>
        {/* Informacje o zajęciach */}
        <Text style={styles.text}>Typ zajęć: {item.fitenssTypeClass ? item.fitenssTypeClass.nameType : 'Brak danych'}</Text>
        <Text style={styles.text}>Data rozpoczęcia: {item.startDate}</Text>
        <Text style={styles.text}>Data zakończenia: {item.endDate}</Text>
        <Text style={styles.text}>Miejsca zajęte: {item.activePlace}</Text>
        <Text style={styles.text}>Miejsca maks.: {item.maxPlace}</Text>
        <Text style={styles.text}>Prowadzący: {item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Brak danych'}</Text>
        <View style={styles.buttonsContainer}>
          {userTypeId === 2 || userTypeId === 3 ? (
            <>
              <TouchableOpacity style={styles.button} onPress={() => console.log(`Edytuj zajęcia o ID: ${item.id}`)}>
                <Text style={styles.buttonText}>Edytuj</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => console.log(`Usuń zajęcia o ID: ${item.id}`)}>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zajęcia z wolnymi miejscami</Text>
      <FlatList
        data={activeClassesWithVacancies}
        keyExtractor={(item, index) => `${index}vacancies`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.title}>W pełni zarezerwowane zajęcia</Text>
      <FlatList
        data={classes}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.title}>Historia zajęć</Text>
      <FlatList
        data={classesPastEndDate}
        keyExtractor={(item, index) => `${index}past`}
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
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default ActiveFitnessClassesPage;
