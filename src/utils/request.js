import axios from "axios"
const baseURL = "https://hearthstone-api.findfuns.org:443/cards/api";
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