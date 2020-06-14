import axios from "axios";

const API_URL = "https://conduit.productionready.io/api";

const userService = {
    post: (url, body) =>
        axios.post(API_URL / url, { body }).then((res) => {
            console.log(res);
            console.log(res.data);
        }),
};

const userActions = {
    login: (email, password) =>
        userService.post("/users/login", { user: { email, password } }),
};

export default {
    userActions,
};
