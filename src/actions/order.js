import * as type from "../actions/types";
import {
    postOrder,
    getUserOrders,
    getSingleUserOrder,
    getUserBudgetHistory,
    singleOrderCancel,
} from "../api/index";

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
        let delivery = getState().cartReducer.deliveryAddress;
        let delivery2 = getState().cartReducer.deliveryAddress2;
        let companyId =
            company !== "all" ? company.charAt(0).toUpperCase() : "";
        Number(basketId);

        postOrder(token, items, basketId, companyId, delivery, delivery2)
            .then(res => {
                console.log(res);
                if (res.data.create.fault === false) {
                    dispatch(setOrderErrorFalse());
                    dispatch(setOrderNumber(res.data.create.orderNumber));
                    dispatch(clearBasket());
                } else {
                    dispatch(setOrderErrorTrue());
                    dispatch(resetOrderError());
                }
            })
            .catch(error => {
                dispatch(setOrderErrorTrue());
                dispatch(resetOrderError());
            });
    };
};

export const resetOrderError = () => {
    return {
        type: type.RESET_ORDER_ERROR,
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

export const getClientBudgetHistory = token => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        getUserBudgetHistory(token, aliasUserId)
            .then(res => {
                dispatch(setClientBudgetHistory(res.data.wixBudgetHistory));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setClientBudgetHistory = data => {
    return {
        type: type.SET_CLIENT_BUDGET_HISTORY,
        data,
    };
};

export const getClientOrdersHistory = token => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        getUserOrders(token, aliasUserId)
            .then(res => {
                dispatch(setClientOrderHistory(res.data.getAll.orders));
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

export const getClientSingleOrdersHistory = (token, id, lang) => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        getSingleUserOrder(token, id, lang, aliasUserId)
            .then(res => {
                dispatch(setSingleOrderHistory(res.data.get));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setSingleOrderHistory = data => {
    return {
        type: type.SET_SINGLE_ORDER_HISTORY,
        data,
    };
};

export const orderCancel = (token, orderId) => {
    return (dispatch, getState) => {
        singleOrderCancel(token, orderId)
            .then(res => {
                if (res.data.cancel === true) {
                    dispatch(cancelOrderStatus(true));
                    dispatch(setOrderStatus(1));
                }
                if (res.data.cancel === false) {
                    dispatch(cancelOrderStatus(false));
                    dispatch(setOrderStatus(2));
                }
            })
            .catch(error => {
                dispatch(cancelOrderStatus(false));
                dispatch(setOrderStatus(2));
            });
    };
};

export const cancelOrderStatus = status => {
    return {
        type: type.CANCEL_ORDER_STATUS,
        status,
    };
};

export const setOrderStatus = status => {
    return {
        type: type.SET_ORDER_STATUS,
        status,
    };
};
