//Endpoints.js
const API_V1 = "/api/v1";
const USERS = "/users";

export class Get {
    static USERS = API_V1 + USERS;
    static USER_BY_ID = API_V1 + USERS + "/id/";
    static EMPLOYEES = API_V1 + USERS + "/employees";
    static ONLY_USERS = API_V1 + USERS + "/users";
    static USER_BY_EMAIL = (email) => `${API_V1}${USERS}/by-email?email=${email}`;
}

export class Post {
    static USER = API_V1 + "/auth/login";
    static USERREG = API_V1 + "/auth/register";
    static USER_LOGOUT = "/logout";
}

export class Put {
    static USER_UPDATE = API_V1 + USERS + "/id";
   
}

export class Delete {
    static USER_DELETE = API_V1 + USERS;
}

