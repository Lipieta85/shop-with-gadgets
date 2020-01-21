import * as type from "../actions/types";

const initialState = {
    subscribeState: 0,
    productName: ''
};

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SUBSCRIBE_RES:
            return {
                ...state,
                subscribeState: action.resState,
            };
        case type.RESET_SUBSCRIBE:
            return {
                ...state,
                subscribeState: action.number,
            };
        case type.SET_PRODUCT_NAME:
            return {
                ...state,
                productName: action.name
            }
        default:
            return state;
    }
};

export default subscriptionReducer;
