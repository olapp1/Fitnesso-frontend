//AuthRequest.js
import axios from 'axios';


// Utwórz instancję axios dla autoryzacji
const apiAuth = axios.create({
  baseURL: "http://192.168.0.13:8080"
});


export { apiAuth };