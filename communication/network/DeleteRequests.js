import { apiAuth } from './AuthRequest';
import { Delete } from '../Endpoints';
import { Utils } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export class DeleteRequests {
  static async deleteReservation(reservationId) {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (!token) {
        console.error('Token is not available');
        return null;
      }
      const response = await apiAuth.delete(`/api/v1/reservations/${reservationId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        console.log(`Reservation ${reservationId} deleted successfully`);
        return true;
      } else {
        const errorMessage = response.data ? response.data.message : 'Failed to delete reservation';
        console.error(`Error: ${errorMessage}`);
        return false;
      }
    } catch (error) {
      console.error('Error during reservation deletion:', error);
      return false;
    }
  }

}

