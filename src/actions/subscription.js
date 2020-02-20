import * as type from "./types";
import { postSubscribe } from "../api";

export const sendSubscribe = (token, productId, clientEmail, lang) => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        postSubscribe(token, productId, clientEmail, lang, aliasUserId)
            .then(res => {
                if (res.data.subscribe.error) {
                    dispatch(subscribeRes(false));
                    dispatch(resetSubscribe(2));
                } else {
                    dispatch(subscribeRes(true));
                    dispatch(resetSubscribe(1));
                }
            })
            .catch(error => {
                dispatch(subscribeRes(false));
                dispatch(resetSubscribe(2));
            });
    };
};

export const subscribeRes = resState => {
    return {
        type: type.SUBSCRIBE_RES,
        resState,
    };
};

export const resetSubscribe = number => {
    return {
        type: type.RESET_SUBSCRIBE,
        number,
    };
};

export const setProductName = (name, productQuantity) => {
    return {
        type: type.SET_PRODUCT_NAME,
        name,
        productQuantity,
    };
};
