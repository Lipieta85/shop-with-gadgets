import * as type from "../actions/types";
import { mapKeys } from "lodash";
import {
    postProduct,
    putProduct,
    removeProduct,
    changeProduct,
    getBasketProduct,
} from "../api";

export const addIfItemEmpty = (id, productQuantity) => {
    return {
        type: type.ADD_IF_ITEM_EMPTY,
        id,
        productQuantity,
    };
};

export const addIfItemExist = (id, productQuantity) => {
    return {
        type: type.ADD_IF_ITEM_EXIST,
        id,
        productQuantity,
    };
};

export const addItemToBasket = (
    id,
    productQuantity,
    unit,
    token,
    quantityLocation,
) => {
    let productAmount = Object.values(productQuantity);
    let productNumber = String(productAmount[0]);

    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        Number(basketId);
        let company = getState().clientDataReducer.companyId;
        let companyId = company.charAt(0).toUpperCase();
        let clientData = getState().clientDataReducer.clientData;
        let adressess = [];
        let deliveryAddress = [];

        if (clientData) {
            clientData.map(data =>
                adressess.push(data.getWixClientData.deliveryAddresses[0]),
            );
            mapKeys(adressess[0], function(value, key) {
                return deliveryAddress.push({ key: value });
            });
        }

        let delivery = deliveryAddress[0].key;

        let existed_item = getState().cartReducer.addedItems.find(
            item => id === item.product.id,
        );

        if (basketId && !existed_item) {
            putProduct(
                id,
                unit,
                token,
                delivery,
                productNumber,
                companyId,
                basketId,
            )
                .then(res => {
                    if (existed_item) {
                        dispatch(addIfItemExist(id, productQuantity));
                    } else {
                        dispatch(addIfItemEmpty(id, productQuantity));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        if (basketId && existed_item) {
            dispatch(
                changeBasketQuantity(
                    id,
                    productQuantity,
                    unit,
                    token,
                    quantityLocation,
                ),
            );
        }
        if (!basketId && !existed_item) {
            postProduct(id, unit, token, delivery, productNumber, companyId)
                .then(res => {
                    dispatch(addBasketId(res.data.create.order.id_orders));
                    if (existed_item) {
                        dispatch(addIfItemExist(id, productQuantity));
                    } else {
                        dispatch(addIfItemEmpty(id, productQuantity));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
};

export const addBasketId = id => {
    return { type: type.ADD_BASKET_ID, id };
};

export const removeCart = (token, id) => {
    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;

        if (basketId) {
            removeProduct(token, id, basketId)
                .then(res => {
                    dispatch(deleteItem(id));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
};

export const deleteItem = id => {
    return {
        type: type.DELETE_ITEM,
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

export const changeBasketQuantity = (
    productId,
    newProductAmount,
    unit,
    token,
    quantityLocation,
) => {
    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        //let addedItems = getState().cartReducer.addedItems;
        let company = getState().clientDataReducer.companyId;
        let companyId = company.charAt(0).toUpperCase();
        let clientData = getState().clientDataReducer.clientData;

        let productAmount = Object.values(newProductAmount);

        let productNumber = String(productAmount[0]);
        let adressess = [];
        let deliveryAddress = [];

        if (clientData) {
            clientData.map(data =>
                adressess.push(data.getWixClientData.deliveryAddresses[0]),
            );
            mapKeys(adressess[0], function(value, key) {
                return deliveryAddress.push({ key: value });
            });
        }

        let delivery = deliveryAddress[0].key;

        changeProduct(
            productId,
            productNumber,
            unit,
            token,
            quantityLocation,
            delivery,
            basketId,
            companyId,
        )
            .then(res => {
                dispatch(changeBasketAmounts(productId, newProductAmount));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const changeBasketAmounts = (productId, newProductAmount) => {
    return {
        type: type.CHANGE_BASKET_AMOUNTS,
        productId,
        newProductAmount,
    };
};

export const getBasketProducts = token => {
    return (dispatch, getState) => {
        getBasketProduct(token)
            .then(res => {
                let baskets = [];
                baskets.push(res.data.get);
                //let lastBasket = baskets[0][baskets[0].length - 1];
                //console.log(lastBasket)
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setBudget = data => {
    return {
        type: type.SET_BUDGET,
        data,
    };
};
