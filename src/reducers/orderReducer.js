import * as type from "../actions/types";

const initialState = {
    historyOfBuy: [],
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_ORDER_DATA:
            return {
                ...state,
                historyOfBuy: state.historyOfBuy.concat(action.data),
            };
        default:
            return state;
    }
};

export default orderReducer;
