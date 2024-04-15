import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import GetRequests from '../communication/network/GetRequests';
import { useNavigation } from '@react-navigation/native';
import { PostRequests } from '../communication/network/PostRequests';
import { DeleteRequests } from '../communication/network/DeleteRequests';

export const getIdTypAccountFromStorage = async () => {
  try {
    const storedIdTypAccount = await AsyncStorage.getItem('idTypAccount');
    return storedIdTypAccount ? parseInt(storedIdTypAccount, 10) : null;
  } catch (error) {
    console.error('Error getting idTypAccount:', error);
    return null;
  }
};

const ActiveFitnessClassesPage = () => {
  const [userTypeId, setUserTypeId] = useState(null);
  const [reservedClasses, setReservedClasses] = useState(new Set());
  const [activeClassesWithVacancies, setActiveClassesWithVacancies] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classesPastEndDate, setClassesPastEndDate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('activeClassesWithVacancies');
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const idTypAccount = await getIdTypAccountFromStorage();
      setUserTypeId(idTypAccount);

      const activeClassesWithVacanciesData = await GetRequests.getActiveClassesWithVacancies();
      const classesData = await GetRequests.getActiveFitnessClasses();
      const classesPastEndDateData = await GetRequests.getClassesPastEndDate();
      setActiveClassesWithVacancies(activeClassesWithVacanciesData || []);
      setClasses(classesData || []);
      setClassesPastEndDate(classesPastEndDateData || []);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reserveClass = async (classId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.log('Nie znaleziono userId zalogowanego użytkownika');
        return;
      }

      console.log(`Wysyłanie żądania rezerwacji dla userId: ${userId}, classId: ${classId}`);
      const result = await PostRequests.reserveClass(userId, classId);
      if (result) {
        setReservedClasses(new Set([...reservedClasses, classId]));
        Alert.alert(
          "Rezerwacja dodana",
          "Twoja rezerwacja została pomyślnie dodana.",
          [{ text: "OK", onPress: () => fetchData() }]
        );
      } else {
        console.log('Nie udało się dodać rezerwacji');
      }
    } catch (error) {
      console.error('Błąd podczas rezerwacji:', error);
    }
  };

  const deleteClass = async (classId) => {
    try {
      const result = await DeleteRequests.deleteClass(classId);
      if (result) {
        Alert.alert(
          "Klasa usunięta",
          "Zajęcia zostały pomyślnie usunięte.",
          [{ text: "OK", onPress: () => fetchData() }]
        );
      } else {
        console.log('Nie udało się usunąć zajęć');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania zajęć:', error);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const renderItem = ({ item }) => {
    const isReserved = reservedClasses.has(item.id);
    const now = new Date();
    const endDate = new Date(item.endDate);
    const isPast = endDate < now;
    const availablePlaces = item.maxPlace - item.activePlace;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>Typ zajęć: {item.fitenssTypeClass ? item.fitenssTypeClass.nameType : 'Brak danych'}</Text>
        <Text style={styles.text}>Początek: {item.startDate}</Text>
        <Text style={styles.text}>Koniec: {item.endDate}</Text>
        <Text style={styles.text}>Zajęte miejsca: {item.activePlace}</Text>
        <Text style={styles.text}>Maksymalna liczba miejsc: {item.maxPlace}</Text>
        <Text style={styles.text}>Instruktor: {item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Brak danych'}</Text>
        <View style={styles.buttonsContainer}>
          {(currentView === 'activeClassesWithVacancies') && (userTypeId === 2 || userTypeId === 3) ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('UpdateWorkerClass', {
                  classId: item.id,
                  onClassUpdated: fetchData
                })}
              >
                <Text style={styles.buttonText}>Edytuj</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacing}></View>
              <TouchableOpacity style={styles.button} onPress={() => deleteClass(item.id)}>
                <Text style={styles.buttonText}>Usuń</Text>
              </TouchableOpacity>
              <View style={styles.buttonSpacing}></View>
            </>
          ) : null}
          {!isPast && availablePlaces > 0 && userTypeId === 1 && !isReserved ? (
            <TouchableOpacity style={styles.button} onPress={() => reserveClass(item.id)}>
              <Text style={styles.buttonText}>Zarezerwuj</Text>
            </TouchableOpacity>
          ) : isReserved ? (
            <TouchableOpacity style={[styles.button, styles.reservedButton]} disabled={true}>
              <Text style={styles.buttonText}>Zarezerwowany</Text>
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
      <View style={styles.Bar}></View>
      <View style={styles.buttonsContainer}>
        <Button title="Aktywne zapisy na zajęcia" onPress={() => setCurrentView('activeClassesWithVacancies')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="W pełni zarezerwowane zajęcia" onPress={() => setCurrentView('classes')} />
        <View style={styles.buttonSpacing}></View>
        <Button title="Historia zajęć" onPress={() => setCurrentView('classesPastEndDate')} />
        <View style={styles.buttonSpacing}></View>
        
        {userTypeId === 2 || userTypeId === 3 ? (
  <Button
    title="Dodaj zajęcia"
    onPress={() => navigation.navigate('AddFitnessClass')}
    style={styles.addButton}
  />
) : null}


      </View>
      
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Odśwież</Text>
      </TouchableOpacity>
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
  Bar: {
    height: 50,
  },
  buttonSpacing: {
    height: 10,
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
  reservedButton: {
    backgroundColor: "green"
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  refreshButtonText: {
    color: 'white',
  },
});

export default ActiveFitnessClassesPage;
