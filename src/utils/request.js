import axios from "axios"
const baseURL = "http://35.78.0.61/cards/api";
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