import axios from "axios";

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
