import * as type from "../actions/types";

const initialState = {
    historyOfBuy: [],
    historyShow: false,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_ORDER_DATA:
            return {
                ...state,
                historyOfBuy: state.historyOfBuy.concat(action.data),
            };
        case type.SHOW_ORDER_HISTORY:
            return {
                ...state,
                historyShow: !state.historyShow,
            };
        default:
            return state;
    }
};

export default orderReducer;
