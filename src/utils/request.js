import axios from "axios"
const baseURL = "https://hearthstone-api.findfuns.org/cards/api";
// const baseURL = "http://localhost:8080/cards/api";
const instance = axios.create({baseURL});

instance.interceptors.response.use(
    result => {
        return result.data;
    },
    err => {
        return Promise.reject(err);
    }
)

export default instance;