import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const ThreeButtonsScreen = () => {
  // Przykładowy stan typu konta (1, 2, lub 3)
  // Możesz ustawić tę wartość dynamicznie na podstawie danych zalogowanego użytkownika
  const [accountTypeId, setAccountTypeId] = useState(1);

  const backgroundImage = require('../assets/pexels-lukas-669577.jpg'); // Zastąp ścieżką do swojego obrazka

  const renderButtonsBasedOnAccountType = () => {
    switch (accountTypeId) {
      case 2: // Dla typu konta 2
        return (
          <>
            <Button title="Pracownicy" onPress={() => Alert.alert("Pracownicy")} color="#007BFF" />
            <View style={styles.spacing} />
            <Button title="Rezerwacje" onPress={() => Alert.alert("Rezerwacje")} color="#28A745" />
            <View style={styles.spacing} />
            <Button title="Użytkownicy" onPress={() => Alert.alert("Użytkownicy")} color="#DC3545" />
            <View style={styles.spacing} />
            <Button title="Zajęcia" onPress={() => Alert.alert("Zajęcia")} color="#6f42c1" />
          </>
        );
      case 1: // Dla typu konta 1
        return (
          <>
            <Button title="Rezerwacje" onPress={() => Alert.alert("Rezerwacje")} color="#28A745" />
            <View style={styles.spacing} />
            <Button title="Zajęcia" onPress={() => Alert.alert("Zajęcia")} color="#6f42c1" />
          </>
        );
      case 3: // Dla typu konta 3
        return (
          <>
            <Button title="Rezerwacje" onPress={() => Alert.alert("Rezerwacje")} color="#28A745" />
            <View style={styles.spacing} />
            <Button title="Użytkownicy" onPress={() => Alert.alert("Użytkownicy")} color="#DC3545" />
            <View style={styles.spacing} />
            <Button title="Zajęcia" onPress={() => Alert.alert("Zajęcia")} color="#6f42c1" />
          </>
        );
      default:
        // Domyślnie nic nie wyświetlaj
        return null;
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container} resizeMode="cover">
      {renderButtonsBasedOnAccountType()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spacing: {
    height: 20, // Odstęp między przyciskami
  },
});

export default ThreeButtonsScreen;
