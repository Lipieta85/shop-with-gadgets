import axios from "../utils/axios";
import moment from "moment-timezone";
import { trackPromise } from "react-promise-tracker";
import host from "./host";

export const getToken = async userData => {
    return await axios({
        method: "post",
        url: `${host}/restApi/generateJWT`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            "user-key": userData,
        },
    });
};

export const getUserData = async token => {
    return await axios({
        method: "get",
        url: `${host}/restApi/user/method/getWixClientData`,
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
    });
};

export const getLinkToken = async token => {
    return await axios({
        method: "post",
        url: `${host}/restApi/generateJWT/useDisposableToken/1`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            dToken: token,
        },
    });
};

export const getRodoPolicy = async token => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22rodoPolicy%22%2C%20%22lang%22%3A%22pl%22%7D`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};
//mh-ecommerce-dev.bpower2.com/index.php/restApi/request/model/Pages/params/{"`key`":"rodoPolicy","lang":"pl"}
export const getStorePolicy = async token => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22storePolicy%22%2C%20%22lang%22%3A%22pl%22%7D`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getAllProducts = async (token, currentPage, company) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/products/method/${company}/parameters/{"pagination":{"page":${currentPage}, "itemsPerPage":8}}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getProductsCategories = async token => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/products/method/categories`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const changeProductsCategory = async (token, company, number) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/products/method/${company}/parameters/{"category": ${Number(
                number,
            )}}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const postProduct = async (
    id,
    unit,
    token,
    delivery,
    productNumber,
    companyId,
) => {
    return await trackPromise(
        axios({
            method: "post",
            url: `${host}/restApi/cart/method/create/parameters/{"bId":"${companyId}"}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            data: {
                timeZone: moment.tz.guess(), //or Intl.DateTimeFormat().resolvedOptions().timeZone
                shipToNumber: delivery,
                items: [
                    {
                        prodId: id,
                        uomPrimary: unit,
                        quantity: productNumber,
                    },
                ],
            },
        }),
    );
};

export const putProduct = async (
    id,
    unit,
    token,
    delivery,
    productNumber,
    companyId,
    basketId,
) => {
    return await trackPromise(
        axios({
            method: "put",
            url: `${host}/restApi/cart/method/addProduct/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`,
            headers: {
                Authorization: token,
            },
            data: {
                timeZone: moment.tz.guess(),
                shipToNumber: delivery,
                items: [
                    {
                        prodId: id,
                        uomPrimary: unit,
                        quantity: productNumber,
                    },
                ],
            },
        }),
    );
};

export const removeProduct = async (token, id, basketId) => {
    return await trackPromise(
        axios({
            method: "delete",
            url: `${host}/restApi/cart/method/deleteProduct/parameters/{"orderId":${basketId}}`,
            headers: {
                Authorization: token,
            },
            data: {
                "0": id,
            },
        }),
    );
};

export const changeProduct = async (
    productId,
    productNumber,
    unit,
    token,
    quantityLocation,
    delivery,
    basketId,
    companyId,
) => {
    return await trackPromise(
        axios({
            method: "put",
            url: `${host}/restApi/cart/method/updateQuantity/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`,
            headers: {
                Authorization: token,
            },
            data: {
                timeZone: moment.tz.guess(),
                shipToNumber: delivery,
                items: [
                    {
                        prodId: productId,
                        uomPrimary: unit,
                        quantity: productNumber,
                    },
                ],
            },
        }),
    );
};

export const getBasketProduct = async token => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/cart/method/get/parameters/{"clientId":"16"}`,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const postOrder = async (
    token,
    items,
    basketId,
    companyId,
    delivery,
) => {
    return await trackPromise(
        axios({
            method: "post",
            url: `${host}/restApi/order/method/create/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            // data: {
            //     timeZone: moment.tz.guess(),
            //     shipToNumber: delivery,
            //     items,
            // },
        }),
    );
};
export const getUserOrders = async (token, delivery) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/order/method/getAll/parameters/{"clientId":15}`,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const getUserBudgetHistory = async token => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/user/method/wixBudgetHistory`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getSingleUserOrder = async (token, orderId) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/order/method/get/parameters/{"orderId":${orderId}}`,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const postSubscribe = (token, productId, clientEmail, lang) => {
    return trackPromise(
        axios({
            method: "post",
            url: `${host}/restApi/products/method/subscribe`,
            headers: {
                Authorization: token,
            },
            data: {
                product: productId,
                lang: lang,
                email: clientEmail,
                storeUrl: "xxx", //edit
            },
        }),
    );
};
