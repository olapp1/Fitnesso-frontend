import { api } from '../Config';
import { Utils } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Put } from '../Endpoints'; 

export class PutRequests {
    static async updateUser(userId, userData, token) {
      try {
        const url = Put.USER_UPDATE(userId);
        const response = await api.put(url, userData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return Utils.mapResponse(response);
      } catch (error) {
        Utils.handleError(error);
        return null;
      }
    }
  }
  
