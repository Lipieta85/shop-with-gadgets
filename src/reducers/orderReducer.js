import * as type from "../actions/types";

const initialState = {
    historyOfBuy: [],
    clientOrderHistory: [],
    setOrderError: "",
    orderNumber: 0,
    singleOrderHistory: [],
    wixBudgetHistory: [],
    cancelOrderStatus: 0
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_CLIENT_BUDGET_HISTORY:
            return {
                ...state,
                wixBudgetHistory: action.data,
            };
        case type.ADD_ORDER_DATA:
            return {
                ...state,
                historyOfBuy: state.historyOfBuy.concat(action.data),
            };
        case type.SET_CLIENT_ORDER_HISTORY:
            return {
                ...state,
                clientOrderHistory: action.data,
            };
        case type.SET_ORDER_ERROR_TRUE:
            return {
                ...state,
                setOrderError: true,
            };
        case type.SET_ORDER_ERROR_FALSE:
            return {
                ...state,
                setOrderError: false,
            };
        case type.SET_ORDER_NUMBER:
            return {
                ...state,
                orderNumber: action.number,
            };
        case type.CLEAR_BASKET:
            return {
                ...state,
                setOrderError: "",
                orderNumber: 0,
            };
        case type.SET_SINGLE_ORDER_HISTORY:
            return {
                ...state,
                singleOrderHistory: action.data,
            };
        case type.CANCEL_ORDER_STATUS:
            return {
                ...state,
                cancelOrderStatus: action.status
            }
        case type.SET_ORDER_STATUS:
            return {
                ...state,
                cancelOrderStatus: action.status
            }
        case type.RESET_ORDER_ERROR:
            return {
                ...state,
                setOrderError: ""
            }
        default:
            return state;
    }
};

export default orderReducer;
