//AuthRequest.js
import axios from 'axios';


// Utwórz instancję axios dla autoryzacji
const apiAuth = axios.create({
  baseURL: "http://192.168.18.18:8080"
});

const logoutUser = async () => {
  try {
    const response = await apiAuth.get('/api/v1/auth/logout');
    return response.data; // Opcjonalnie zwróć dane odpowiedzi
  } catch (error) {
    throw error; // Rzuć błąd w przypadku niepowodzenia
  }
};

export { apiAuth, logoutUser };
