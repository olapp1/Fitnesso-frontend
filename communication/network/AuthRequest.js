import axios from 'axios';

const apiAuth = axios.create({
  baseURL: "http://192.168.0.17:8080"
});

const logoutUser = async () => {
  try {
    const response = await apiAuth.get('/api/v1/auth/logout');
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export { apiAuth, logoutUser };
