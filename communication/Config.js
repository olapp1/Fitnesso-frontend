import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getToken = async () => {
  try {
    const tokenString = await AsyncStorage.getItem('Token');
    console.log('Token string:', tokenString); // Log the token string
    return tokenString ? tokenString : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const getAuthorizationHeader = async () => {
  try {
    const token = await getToken();
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting authorization header:', error);
    return null;
  }
};

export const api = axios.create({
  baseURL: 'http://localhost:8081',
});
