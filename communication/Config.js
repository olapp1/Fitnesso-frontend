
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Funkcja do pobierania tokena z AsyncStorage
export const getToken = async () => {
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
export const getAuthorizationHeader = async () => {
  try {
    const token = await getToken();
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting authorization header:', error);
    return null;
  }
};

// Utwórz instancję axios dla API
export const api = axios.create({
  baseURL: "http://192.168.0.17:8080"
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