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

export const getUserData = async (token, aliasUserId) => {
    let url = `${host}/restApi/user/method/getWixClientData`;
    if (aliasUserId)
        url = `${host}/restApi/user/method/getWixClientData/parameters/{"aliasUserId":"${aliasUserId}"}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getLinkToken = async token => {
    return await trackPromise(
        axios({
            method: "post",
            url: `${host}/restApi/generateJWT/useDisposableToken/1`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                dToken: token,
            },
        }),
    );
};

export const getStorePolicy = async (token, lang) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22storePolicy%22%2C%20%22lang%22%3A%22${lang}%22%7D`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getContactDetails = async (token, lang) => {
    return await trackPromise(
        axios({
            method: "get",
            url: `${host}/restApi/request/model/Pages/params/%7B%22%60key%60%22%3A%22storeContact%22%2C%20%22lang%22%3A%22${lang}%22%7D`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getAllProducts = async (
    token,
    currentPage,
    company,
    lang,
    aliasUserId,
    cache
) => {
    let url = `${host}/restApi/products/method/${company}/parameters/{"lang":"${lang}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    if (cache)
        url = `${host}/restApi/products/method/${company}/parameters/{"lang":"${lang}", "cache":"false", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    if (aliasUserId){
        url = `${host}/restApi/products/method/${company}/parameters/{"lang":"${lang}", "aliasUserId":"${aliasUserId}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
        if (cache)
            url = `${host}/restApi/products/method/${company}/parameters/{"lang":"${lang}", "cache":"false", "aliasUserId":"${aliasUserId}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    }

    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getProductsCategories = async (token, companyId, lang) => {
    let url = `${host}/restApi/products/method/categories/parameters/{"lang":"${lang}", "bId":"${companyId}"}`;

    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const changeProductsCategory = async (
    token,
    number,
    company,
    currentPage,
    lang,
    aliasUserId,
    cache
) => {
    let url = `${host}/restApi/products/method/${company}/parameters/{"category": ${Number(
        number,
    )}, "lang":"${lang}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    if (cache)
        url = `${host}/restApi/products/method/${company}/parameters/{"cache":"false", "category": ${Number(
            number,
        )}, "lang":"${lang}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    if (aliasUserId){
        url = `${host}/restApi/products/method/${company}/parameters/{"aliasUserId":"${aliasUserId}", "category": ${Number(
            number,
        )}, "lang":"${lang}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
        if (cache)
            url = `${host}/restApi/products/method/${company}/parameters/{"cache":"false", "aliasUserId":"${aliasUserId}", "category": ${Number(
                number,
            )}, "lang":"${lang}", "pagination":{"page":${currentPage}, "itemsPerPage":12}}`;
    }
        
    
    return await trackPromise(
        axios({
            method: "get",
            url: url,
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

export const searchProduct = async (
    token,
    currentPage,
    lang,
    name,
    company,
    aliasUserId,
) => {
    let url = `${host}/restApi/products/method/${company}/parameters/{"lang":"${lang}", "search":{"name":"${name}"}, "pagination":{"page":${currentPage}, "itemsPerPage":8}}`;
    if (aliasUserId)
        url = `${host}/restApi/products/method/${company}/parameters/{"aliasUserId":"${aliasUserId}", "lang":"${lang}", "search":{"name":"${name}"}, "pagination":{"page":${currentPage}, "itemsPerPage":8}}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
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
    delivery2,
) => {
    let url = `${host}/restApi/order/method/create/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`;
    let deliveryNumber = delivery;
    if (delivery2) {
        deliveryNumber = delivery2;
    }
    return await trackPromise(
        axios({
            method: "post",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            data: {
                shipToNumber: deliveryNumber,
            },
        }),
    );
};
export const getUserOrders = async (token, aliasUserId, lang) => {
    let url = `${host}/restApi/order/method/getAll/parameters/{"lang":"en"}`;
    if (aliasUserId)
        url = `${host}/restApi/order/method/getAll/parameters/{"lang":"en", "aliasUserId":"${aliasUserId}"}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const getUserBudgetHistory = async (token, aliasUserId, lang) => {
    let url = `${host}/restApi/user/method/wixBudgetHistory/parameters/{"lang":"en"}`;
    if (aliasUserId)
        url = `${host}/restApi/user/method/wixBudgetHistory/parameters/{"lang":"en", "aliasUserId":${aliasUserId}}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        }),
    );
};

export const getSingleUserOrder = async (token, orderId, lang, aliasUserId) => {
    let url = `${host}/restApi/order/method/get/parameters/{"orderId":${orderId},"lang":"${lang}"}`;
    if (aliasUserId)
        url = `${host}/restApi/order/method/get/parameters/{"orderId":${orderId},"lang":"${lang}","aliasUserId":"${aliasUserId}"}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const postSubscribe = (token, productId, clientEmail, lang) => {
    let url = `${host}/restApi/products/method/subscribe`;
    return trackPromise(
        axios({
            method: "post",
            url: url,
            headers: {
                Authorization: token,
            },
            data: {
                product: productId,
                lang: lang,
                email: clientEmail,
            },
        }),
    );
};

export const singleOrderCancel = async (token, orderId) => {
    let url = `${host}/restApi/order/method/cancel/parameters/{"orderId":${orderId}}`;
    return await trackPromise(
        axios({
            method: "post",
            url: url,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const getStorePolicyAccepted = async (token, aliasUserId) => {
    let url = `${host}/restApi/user/method/wixIsStorePolicyAccepted`;
    if (aliasUserId)
        url = `${host}/restApi/user/method/wixIsStorePolicyAccepted/parameters/{"aliasUserId":"${aliasUserId}"}`;
    return await trackPromise(
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        }),
    );
};

export const setAcceptPolicy = async (token, aliasUserId) => {
    let url = `${host}/restApi/user/method/wixAcceptStorePolicy`;
    if (aliasUserId)
        url = `${host}/restApi/user/method/wixAcceptStorePolicy/parameters/{"aliasUserId":"${aliasUserId}"}`;
    return await trackPromise(
        axios({
            method: "put",
            url: url,
            headers: {
                Authorization: token,
            },
        }),
    );
};
