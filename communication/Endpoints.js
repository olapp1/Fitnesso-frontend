const API_V1 = "/api/v1";
const USERS = "/users";

export const Get = {
    USERS: API_V1 + USERS,
    USER_BY_ID: (userId) => `${API_V1}${USERS}/${userId}`,
    EMPLOYEES: API_V1 + USERS + "/employees",
    ONLY_USERS: API_V1 + USERS + "/users",
    USER_BY_EMAIL: (email) => `${API_V1}${USERS}/by-email?email=${email}`,

};

export const Post = {
    USER: API_V1 + "/auth/login",
    USERREG: API_V1 + "/auth/register",
    USER_LOGOUT: "/logout",
};

export const Put = {
    USER_UPDATE: (userId) => `${API_V1}${USERS}/${userId}`,
};

export const Delete = {
    USER_DELETE: (userId) => `${API_V1}${USERS}/${userId}`,
};