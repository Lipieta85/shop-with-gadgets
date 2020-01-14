import * as type from "./types";
import {
    postSubscribe
} from "../api";

export const sendSubscribe = (token, productId, clientEmail, lang) => {
    
    return (dispatch, getState) => {
        postSubscribe(token, productId, clientEmail, lang)
            .then(res => {
                if (res.data.subscribe.error) {
                    dispatch(subscribeRes(false))
                    dispatch(resetSubscribe(2))
                }
                else {
                dispatch(subscribeRes(true))
                dispatch(resetSubscribe(1))
                }
            })
            .catch(error => {              
                dispatch(subscribeRes(false))
                dispatch(resetSubscribe(2))
            });
    }
}

export const subscribeRes = (resState) => {
    return {
        type: type.SUBSCRIBE_RES,
        resState
    }
}

export const resetSubscribe = (number) => {
    return {
        type: type.RESET_SUBSCRIBE,
        number
    }
}

