import * as type from "../actions/types";

export const addIfItemEmpty = (id, productQuantity) => {
    return {
        type: type.ADD_IF_ITEM_EMPTY,
        id,
        productQuantity
    };
};

export const addIfItemExist = (id, productQuantity) => {
    return {
        type: type.ADD_IF_ITEM_EXIST,
        id,
        productQuantity
    };
};

export const addItemToBasket = (id, productQuantity) => {
    return (dispatch, getState) => {
        let existed_item = getState().cartReducer.addedItems.find(
            item => id === item.id
        );
        console.log(existed_item);
        if (existed_item) {
            dispatch(addIfItemExist(id, productQuantity));
        } else {
            dispatch(addIfItemEmpty(id, productQuantity));
        }
    };
};

export const removeCart = id => {
    return {
        type: type.REMOVE_CART,
        id
    };
};

export const addChecked = (item, isChecked) => {
    return {
        type: type.ADD_CHECK,
        item,
        isChecked
    };
};

export const clearBasket = () => {
    return {
        type: type.CLEAR_BASKET
    };
};

export const changeBasketAmounts = (productId, newProductAmount) => {
    return {
        type: type.CHANGE_BASKET_AMOUNTS,
        productId,
        newProductAmount
    };
};
