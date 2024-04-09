import { apiAuth } from './AuthRequest';
import { Post } from '../Endpoints';
import { Utils } from './Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


export class PostRequests {
  // USERS
  static async logInUser(email, password) {
    try {
      const response = await apiAuth.post(Post.USER, {
        email: email,
        password: password
      });

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem('Token', token);
        return { token: token };
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw new Error('An error occurred during login.');
    }
  }

  static registerUser(first_name, last_name, login, email, password, phone) {
    return apiAuth.post(Post.USERREG, {
      firstName: first_name,
      lastName: last_name,
      login: login,
      email: email,
      password: password,
      phone: phone
    }).then(Utils.mapResponse)
        .catch(Utils.handleError);
  }

  static logout() {
    return apiAuth.post(Post.USER_LOGOUT).then(Utils.mapResponse)
        .catch(Utils.handleError);
  }

  static async reserveClass(userId, fitnessClassId) {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (!token) {
        console.error('Token is not available');
        return null;
      }

      const response = await apiAuth.post(Post.RESERVATION_ADD, {
        user: userId,
        fitnessClass: fitnessClassId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return Utils.mapResponse(response);
    } catch (error) {
      Utils.handleError(error);
      return null;
    }
  }
}