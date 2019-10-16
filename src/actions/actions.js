import * as type from "../actions/types";

export const changeText = text => {
    return {
        type: type.CHANGE_TEXT,
        text
    };
};

export const addItemToBasket = id => {
    return {
        type: type.ADD_TO_BASKET,
        id
    }
};

export const addQuantity = id => {
    return {
        type: type.ADD_QUANTITY,
        id
    }
};

export const subtractQuantity = id => {
    return {
        type: type.SUBTRACT_QUANTITY,
        id
    }
};

export const removeCart = id => {
    return {
        type: type.REMOVE_CART,
        id
    }
};

