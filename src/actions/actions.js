import * as type from "../actions/types";

export const changeText = text => {
    return {
        type: type.CHANGE_TEXT,
        text,
    };
};

export const addItemToBasket = id => {
    return {
        type: type.ADD_TO_BASKET,
        id,
    };
};

export const addQuantity = id => {
    return {
        type: type.ADD_QUANTITY,
        id,
    };
};

export const subtractQuantity = id => {
    return {
        type: type.SUBTRACT_QUANTITY,
        id,
    };
};

export const removeCart = id => {
    return {
        type: type.REMOVE_CART,
        id,
    };
};

export const addChecked = item => {
    return {
        type: type.ADD_CHECK,
        item,
    };
};

export const getProduct = id => {
    return {
        type: type.GET_PRODUCT,
        id,
    };
};

export const clearBasket = () => {
    return {
        type: type.CLEAR_BASKET,
    };
};
