import axios from "axios";

const token = sessionStorage.getItem("token");

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

console.log(token);
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
