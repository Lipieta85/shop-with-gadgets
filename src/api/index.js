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

export const getUserData = async t => {
    return await axios({
        method: "get",
        url:
            "https://mh-ecommerce-dev.bpower2.com/index.php/restApi/user/method/getLoggedUser",
        headers: {
            "Content-Type": "application/json",
            Authorization: t,
        },
    });
};
