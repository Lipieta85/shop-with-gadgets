import axios from "axios";
import storage from "redux-persist/lib/storage";
import host2 from "../api/host2";

const instance = axios.create({});

instance.interceptors.response.use(
    function(response) {
        if (response.data.token) {
            localStorage.removeItem("token");
            localStorage.setItem("token", response.data.token);

            const token = localStorage.getItem("token");
            instance.defaults.headers.common["Authorization"] = token;
        }
        return response;
    },
    function(error) {
        if (error.response.status === 401 && localStorage.length) {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            storage.removeItem("persist:root");
            window.location.replace(`${host2}/404`);
        }
        // if (error.response.status === 404) {
        //     window.location.replace("http://192.168.0.105:3000/404");
        // }
        return Promise.reject(error);
    },
);

export default instance;
