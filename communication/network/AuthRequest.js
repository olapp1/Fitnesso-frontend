//AuthRequest.js
import axios from 'axios';


// Utwórz instancję axios dla autoryzacji
const apiAuth = axios.create({
    baseURL: "http://localhost:8080",
});


export { apiAuth };