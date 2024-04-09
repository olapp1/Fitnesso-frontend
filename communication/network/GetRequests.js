import { Get } from '../Endpoints';
import { api } from '../Config';
import { Utils } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_V1 } from '../../communication/Endpoints';

class GetRequests {
    // Metoda pobierająca wszystkich użytkowników
    static async getAllUsers() {
        try {
            const response = await api.get(Get.USERS);
            return Utils.mapResponse(response);
        } catch (error) {
            Utils.handleError(error);
        }
    }

    // Metoda pobierająca użytkownika po ID
    static async getUserById(id) {
        try {
            const response = await api.get(`${Get.USER_BY_ID}/${id}`); // Poprawiony adres URL
            return Utils.mapResponse(response);
        } catch (error) {
            Utils.handleError(error);
        }
    }


    // Metoda pobierająca szczegóły użytkownika po ID

    static async getUserDetailsById(userId) {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token) {
                const response = await api.get(`${API_V1}/users/${userId}/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return Utils.mapResponse(response);
            } else {
                console.error('Token is not available');
                return null;
            }
        } catch (error) {
            Utils.handleError(error);
        }
    }

    static async getUserIdByEmail(email) {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token) {
                const response = await api.get(`/api/v1/users/by-email?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data; 
            } else {
                console.error('Token is not available');
                return null;
            }
        } catch (error) {
            console.error('Error getting user ID:', error.message);
            return null;
        }
    }
    static async getActiveFitnessClasses() {
        try {
            const token = await AsyncStorage.getItem('Token');
            if (token) {
                const response = await api.get(`${API_V1}/itness-classes/activeFull`, { 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return Utils.mapResponse(response); 
            } else {
                console.error('Token is not available');
                return null;
            }
        } catch (error) {
            Utils.handleError(error); 
        }
    }
    static async getClassesPastEndDate() {
        try {
          const token = await AsyncStorage.getItem('Token');
          if (token) {
            const response = await api.get(`${API_V1}/itness-classes/endDate`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return Utils.mapResponse(response);
          } else {
            console.error('Token is not available');
            return null;
          }
        } catch (error) {
          Utils.handleError(error);
          return null;
        }
      }
    
      static async getActiveClassesWithVacancies() {
        try {
          const token = await AsyncStorage.getItem('Token');
          if (token) {
            const response = await api.get(`${API_V1}/itness-classes/active-with-vacancies`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return Utils.mapResponse(response);
          } else {
            console.error('Token is not available');
            return null;
          }
        } catch (error) {
          Utils.handleError(error);
          return null;
        }
      }
      static async getUserAcceptedReservations(userId) {
        try {
          const token = await AsyncStorage.getItem('Token');
          if (!token) {
            console.error('Token is not available');
            return null;
          }
          const response = await api.get(`/api/v1/reservations/user/${userId}/accepted`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return Utils.mapResponse(response);
        } catch (error) {
          Utils.handleError(error);
          return null;
        }
      }
    
      static async getUserNotAcceptedReservations(userId) {
        try {
          const token = await AsyncStorage.getItem('Token');
          if (!token) {
            console.error('Token is not available');
            return null;
          }
          const response = await api.get(`/api/v1/reservations/user/${userId}/not-accepted`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return Utils.mapResponse(response);
        } catch (error) {
          Utils.handleError(error);
          return null;
        }
      }
    
    
}


export default GetRequests;
