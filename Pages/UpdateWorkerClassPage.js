import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GetRequests from '../communication/network/GetRequests';
import { PutRequests } from '../communication/network/PutRequests';

const UpdateWorkerClassScreen = ({ route }) => {
  const { classId } = route.params;
  const navigation = useNavigation();

  const [className, setClassName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePlace, setActivePlace] = useState('');
  const [maxPlace, setMaxPlace] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassDetails();
  }, []);

  const fetchClassDetails = async () => {
    try {
      const classDetails = await GetRequests.getActiveClassesWithVacancies();
      const classDetail = classDetails.find(classItem => classItem.id === classId);

      if (classDetail) {
        setClassName(classDetail.fitenssTypeClass.nameType);
        setStartDate(classDetail.startDate);
        setEndDate(classDetail.endDate);
        setActivePlace(classDetail.activePlace.toString());
        setMaxPlace(classDetail.maxPlace.toString());
        setInstructorId(classDetail.user.id.toString());
      } else {
        console.error('Nie znaleziono szczegółów zajęć o danym ID');
      }
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów zajęcia', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Brak tokenu', 'Zaloguj się ponownie', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
        return;
      }
  
      const updatedClassData = {
        numberClass: parseInt(classId),
        fitenssTypeClass: 1,
        startDate: startDate,
        endDate: endDate,
        activePlace: parseInt(activePlace),
        maxPlace: parseInt(maxPlace),
        user: parseInt(instructorId)
      };
  
      console.log('Id zmienianego zajęcia:', classId); 
      
      console.log('Dane do aktualizacji:', updatedClassData); 
  
      const result = await PutRequests.updateWorkerClass(classId, updatedClassData, token);
      
      if (result) {
        Alert.alert(
          "Aktualizacja",
          "Dane zostały zaktualizowane pomyślnie.",
          [{ text: "OK", onPress: () => navigation.navigate('AllClasses') }]
        );
      } else {
        console.error('Nie udało się zaktualizować klasy.');
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji klasy:', error);
      Alert.alert('Błąd', 'Wystąpił błąd podczas aktualizacji klasy');
    }
  };
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edytuj zajęcia</Text>
      <View style={styles.inputContainer}>
        <Text>Nazwa zajęć:</Text>
        <TextInput
          style={styles.input}
          value={className}
          onChangeText={text => setClassName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Data rozpoczęcia:</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={text => setStartDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Data zakończenia:</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={text => setEndDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Miejsca zajęte:</Text>
        <TextInput
          style={styles.input}
          value={activePlace}
          onChangeText={text => setActivePlace(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Maksymalna liczba miejsc:</Text>
        <TextInput
          style={styles.input}
          value={maxPlace}
          onChangeText={text => setMaxPlace(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Instruktor ID:</Text>
        <TextInput
          style={styles.input}
          value={instructorId}
          onChangeText={text => setInstructorId(text)}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>Aktualizuj</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: 'center',
  },
});

export default UpdateWorkerClassScreen;
