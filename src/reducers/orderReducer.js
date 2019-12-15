import * as type from "../actions/types";

const initialState = {
    historyOfBuy: [],
    clientOrderHistory: []
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_ORDER_DATA:
            return {
                ...state,
                historyOfBuy: state.historyOfBuy.concat(action.data),
            };
        case type.SET_CLIENT_ORDER_HISTORY:
            return {
                ...state,
                clientOrderHistory: state.clientOrderHistory.concat(action.data)
            }
        default:
            return state;
    }
};

export default orderReducer;
