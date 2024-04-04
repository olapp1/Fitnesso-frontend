
const AsyncStorage = require('@react-native-async-storage/async-storage');
import axios from 'axios';

// Funkcja do pobierania tokena z AsyncStorage
const getToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem("Token");
    console.log("Token string:", tokenString); // Log the token string
    return tokenString ? tokenString : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Funkcja do pobierania nagłówka autoryzacji
const getAuthorizationHeader = async () => {
  try {
    const token = await getToken();
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting authorization header:', error);
    return null;
  }
};

// Utwórz instancję axios dla API
const api = axios.create({
  baseURL: "http://192.168.18.18:8080"
});

// Przechwyć i dodaj nagłówek autoryzacji do każdego żądania
api.interceptors.request.use(
    async (config) => {
      const token = await getAuthorizationHeader();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Eksportuj zmienne i funkcje
module.exports = {
  getToken,
  getAuthorizationHeader,
  api
};