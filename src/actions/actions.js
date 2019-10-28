import * as type from "../actions/types";

export const changeText = text => {
    return {
        type: type.CHANGE_TEXT,
        text,
    };
};

export const addItemToBasket = (id, productQuantity) => {
    return {
        type: type.ADD_TO_BASKET,
        id,
        productQuantity,
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

export const addChecked = (item, isChecked) => {
    return {
        type: type.ADD_CHECK,
        item,
        isChecked,
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

export const changeBasketAmounts = (productId, newProductAmount) => {
    return {
        type: type.CHANGE_BASKET_AMOUNTS,
        productId,
        newProductAmount,
    };
};
