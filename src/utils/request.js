import axios from "axios"
const baseURL = "http://18.182.168.169/cards/api";
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