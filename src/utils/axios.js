import axios from "axios";

const instance = axios.create({});

instance.interceptors.response.use(
    function(response) {
        if (response.data.token) {
            sessionStorage.removeItem("token");
            sessionStorage.setItem("token", response.data.token);

            const token = sessionStorage.getItem("token");
            instance.defaults.headers.common["Authorization"] = token;
        }
        return response;
    },
    function(error) {
        if (error.response.status === 401 || error.response.status === 401) {
            sessionStorage.removeItem("token");
            window.location.replace("http://192.168.0.105:3000/404");
        }
        return Promise.reject(error);
    },
);

export default instance;
