import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AllEmployeesv from  './Pages/AllEmployeesPage';
import UserDetailsPage from './Pages/UserDetailsPage';
import Oferta from './Pages/Oferta';
import StronaGlowna from './Pages/StronaGlowna';
import AllClasses from './Pages/AllClassesPage';
import AllReservations from './Pages/AllReservationsPage';
import WorkerReservations from './Pages/WorkerReservationsPage';
import { useNavigation } from '@react-navigation/native';
import AllEmployeesPage from "./Pages/AllEmployeesPage";
import AddUserPage from "./Pages/AddUserPage";
import AllCustomerPage from "./Pages/AllCustomerPage";
import AllWorkerClassesPage from "./Pages/AllWorkerClassesPage";
import AddFitnessClassPage from "./Pages/AddFitnessClassPage";
import UpdateWorkerClassPage from "./Pages/UpdateWorkerClassPage";


const Stack = createNativeStackNavigator();

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

        <TouchableOpacity onPress={() => navigation.navigate('WorkerReservations')} style={styles.button}>
          <Text style={styles.buttonText}>Zarządzanie rezerwacjami</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AllClasses')} style={styles.button}>
          <Text style={styles.buttonText}>Zarządzanie zajęciami</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="AllEmployee" component={AllEmployeesPage} options={{ headerShown: false }} />
        <Stack.Screen name="AddEmployee" component={AddUserPage} options={{ headerShown: false }} />
        <Stack.Screen name="AddFitnessClass" component={AddFitnessClassPage} options={{ headerShown: false }} />
        <Stack.Screen name="WorkerClasses" component={AllWorkerClassesPage} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateWorkerClass" component={UpdateWorkerClassPage} options={{ headerShown: false }} />
        <Stack.Screen name="AllCustomer" component={AllCustomerPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="UserDetails" component={UserDetailsPage} options={{ headerShown: false }} />
        <Stack.Screen name="Oferta" component={Oferta} options={{ headerShown: false }} />
        <Stack.Screen name="StronaGlowna" component={StronaGlowna} options={{ headerShown: false }} />
        <Stack.Screen name="AllClasses" component={AllClasses} options={{ headerShown: false }} />
        <Stack.Screen name="AllReservations" component={AllReservations} options={{ headerShown: false }} />
        <Stack.Screen name="WorkerReservations" component={WorkerReservations} options={{ headerShown: false }} />
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
    backgroundColor: "#000000a0", 
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
