import * as type from "../actions/types";
import axios from "../utils/axios";
import { postOrder } from "../api/index";
import { mapKeys } from "lodash";
import host from "../api/host";

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
        Number(basketId);

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

        let delivery = deliveryAddress[0].key;

        postOrder(token, items, basketId, companyId, delivery)
            .then(res => {
                if (res.data.create.errors === "") {
                    dispatch(setOrderErrorFalse());
                    dispatch(setOrderNumber(res.data.create.orderNumber));
                } else {
                    dispatch(setOrderErrorTrue());
                }
                dispatch(clearBasket());
            })
            .catch(error => {
                console.log(error);
                dispatch(setOrderErrorTrue());
            });
    };
};

export const setOrderErrorFalse = () => {
    return {
        type: type.SET_ORDER_ERROR_FALSE,
    };
};

export const setOrderErrorTrue = () => {
    return {
        type: type.SET_ORDER_ERROR_TRUE,
    };
};

export const setOrderNumber = orderNum => {
    return {
        type: type.SET_ORDER_NUMBER,
        number: orderNum,
    };
};

export const clearBasket = () => {
    return {
        type: type.CLEAR_BASKET,
    };
};

export const getClientOrdersHistory = token => {
    return (dispatch, getState) => {
        const url = `${host}/restApi/order/method/getAll/parameters/{"clientId":16}`;
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

export const productsToOrder = products => {
    return {
        type: type.PRODUCTS_TO_ORDER,
        products,
    };
};
