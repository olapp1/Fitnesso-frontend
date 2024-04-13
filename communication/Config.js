
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
// Funkcja do zapisywania userId
export const setUserId = async (userId) => {
  try {
    await AsyncStorage.setItem("userId", userId.toString());
    console.log("UserId saved:", userId); // Log the saving action
  } catch (error) {
    console.error('Error saving userId:', error);
  }
};
``
// Funkcja do pobierania userId
export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    console.log("UserId retrieved:", userId); // Log the userId
    return userId ? userId : null;
  } catch (error) {
    console.error('Error getting userId:', error);
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
  setUserId,
  getUserId,
  api
};
