//PostRequest.js
import { apiAuth } from './AuthRequest';
import { Post } from '../Endpoints';
import { Utils } from './Utils';

export class PostRequests {
    // USERS
    static logInUser(email, password) {
        return apiAuth.post(Post.USER, {
            email: email,
            password: password
        })
        .then(response => {
            if (response.ok) {
                // Jeśli odpowiedź jest prawidłowa, przechwyć token
                const token = response.data.token;

                // Zapisz token w pamięci lokalnej
                localStorage.setItem('Token', token);
            }

            return Utils.mapResponse(response);
        })
        .catch(Utils.handleError);
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
}