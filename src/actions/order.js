import * as type from "../actions/types";

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
