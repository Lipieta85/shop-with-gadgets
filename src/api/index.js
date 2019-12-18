import axios from "../utils/axios";

export const getToken = async userData => {
    return await axios({
        method: "post",
        url:
            "https://mh-ecommerce-dev.bpower2.com/index.php/restApi/generateJWT",
        headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong",
        },
        data: {
            "user-key": userData,
        },
    });
};

export const getUserData = async token => {
    return await axios({
        method: "get",
        url:
            "https://mh-ecommerce-dev.bpower2.com/index.php/restApi/user/method/getWixClientData",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};

export const getLinkToken = async token => {
    return await axios({
        method: "post",
        url:
            "https://mh-ecommerce-dev.bpower2.com/index.php/restApi/generateJWT/useDisposableToken/1",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            dToken: token,
        },
    });
};
export const getRodoPolicy = async token => {
    return await axios({
        method: "get",
        url: `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22rodoPolicy%22%2C%20%22lang%22%3A%22pl%22%7D`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};

export const getStorePolicy = async token => {
    return await axios({
        method: "get",
        url: `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22storePolicy%22%2C%20%22lang%22%3A%22pl%22%7D`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};
