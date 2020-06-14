import axios from "axios";

const API_URL = "https://conduit.productionready.io/api";

let token = null;
const authToken = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const handleResponse = res => res.body;

const userService = {
    post: (url, body) =>
        axios.post(`${API_URL}${url}`, { body }).then(handleResponse),
    get: url =>
        axios.get(`${API_URL}${url}`).then(handleResponse)
};

const userActions = {
    login: (email, password) =>
        userService.post("/users/login", { user: { email, password } }),
    currentUser: () =>
        userService.get('/user'),
    register: (username, email, password) =>
        userService.post('/users', { user: { username, email, password } })
};

export default {
    userActions
};
