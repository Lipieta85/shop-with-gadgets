import * as type from "../actions/types";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { mapKeys } from "lodash";

export const orderInputState = value => {
    return {
        type: type.ORDER_INPUT_STATE,
        value,
    };
};

export const orderSelectInputValue = value => {
    return {
        type: type.ORDER_SELECT_INPUT_VALUE,
        value,
    };
};

export const addOrderData = data => {
    return {
        type: type.ADD_ORDER_DATA,
        data,
    };
};

export const createOrder = (token, items) => {
    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        let items = getState().cartReducer.productsToOrder;
        const company = getState().clientDataReducer.companyId;
        let companyId = company.charAt(0).toUpperCase();
        Number(basketId)

        let clientData = getState().clientDataReducer.clientData;

        let adressess = [];
        let deliveryAddress = [];

        if (clientData) {
            clientData.map(data =>
                adressess.push(data.getWixClientData.deliveryAddresses[0]),
            );
            mapKeys(adressess[0], function(value, key) {
                return deliveryAddress.push({ key: value });
            });
        }

        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/createOrder/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`;
        trackPromise(
        axios({
            method: "post",
            url: url,
            data: {
                "timeZone": "Pacific/Chatham",
                "shipToNumber" : deliveryAddress[0].key,
                items
            },
            headers: {
                Authorization: token,
            },          
        })
            .then(res => {
                console.log(res);
                dispatch(clearBasket())
            })
            .catch(error => {
                console.log(error);
            })
        )
    };
};

export const clearBasket = () => {
    return {
        type: type.CLEAR_BASKET,
    };
};

export const getClientOrdersHistory = token => {
    return (dispatch, getState) => {
        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/getOrders/parameters/{“clientId”:182887}`;
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        })
            .then(res => {
                console.log(res);
                //dispatch(setClientOrderHistory(res))
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setClientOrderHistory = data => {
    return {
        type: type.SET_CLIENT_ORDER_HISTORY,
        data,
    };
};

export const productsToOrder = (products) => {
    return {
        type: type.PRODUCTS_TO_ORDER,
        products
    }
}