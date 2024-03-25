import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import UpdateUserPage from './UpdateUserPage';
import UserDetailsPage from './UserDetailsPage';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// Użyj `require` zamiast obiektu z uri dla lokalnych zasobów
const backgroundImage = require('./assets/pedro-araujo-PDjYClxmnyk-unsplash.jpg');

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Witaj na stronie Fitnesso</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Logowanie</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
          <Text style={styles.buttonText}>Rejestracja</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateUserPage')} style={styles.button}>
          <Text style={styles.buttonText}>Zaktualizuj dane</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserDetailsPage')} style={styles.button}>
          <Text style={styles.buttonText}>Dane użytkownika</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateUser" component={UpdateUserPage} options={{ headerShown: false }} />
        <Stack.Screen name="UserDetails" component={UserDetailsPage} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#000000a0", // Półprzezroczyste tło dla tekstu
    padding: 10,
  },
  button: {
    backgroundColor: "#000000a0",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  }
});
