import * as type from "../actions/types";

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
    let newProductQuantity = productQuantity;
    let productAmount = Object.values(productQuantity);
    let productNumber = String(productAmount[0]);

    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        Number(basketId);
        let company = getState().clientDataReducer.companyId;
        let delivery = getState().clientDataReducer.deliveryAddress;

        let companyId =
            company !== "all" ? company.charAt(0).toUpperCase() : "";

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
                    console.log(res);
                    if (res.data.addProduct.error) {
                        dispatch(addProductConfirmationModalState("error"));
                    } else {
                        if (existed_item) {
                            dispatch(addIfItemExist(id, productQuantity));
                        } else {
                            dispatch(addIfItemEmpty(id, productQuantity));
                        }
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
                    newProductQuantity,
                    unit,
                    token,
                    quantityLocation,
                ),
            );
        }
        if (!basketId && !existed_item) {
            postProduct(id, unit, token, delivery, productNumber, companyId)
                .then(res => {
                    if (!res.data.create.order) {
                        dispatch(addProductConfirmationModalState("error"));
                    } else {
                        dispatch(addBasketId(res.data.create.order.id_orders));
                        if (existed_item) {
                            dispatch(addIfItemExist(id, productQuantity));
                        } else {
                            dispatch(addIfItemEmpty(id, productQuantity));
                        }
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
        let changedProductAmount = newProductAmount;

        let value = Number(Object.values(changedProductAmount).join(""));

        let basketId = getState().cartReducer.basket;
        let addedItems = getState().cartReducer.addedItems;
        let company = getState().clientDataReducer.companyId;
        let delivery = getState().clientDataReducer.deliveryAddress;
        let companyId =
            company !== "all" ? company.charAt(0).toUpperCase() : "";
        let addedItem = addedItems.find(item => item.product.id === productId);
        let amount = 0;

        if (quantityLocation) {
            amount = addedItem.quantity;
            amount += value;
            for (let key in changedProductAmount) {
                changedProductAmount[key] = String(amount);
            }
        }

        let productAmount = Object.values(changedProductAmount);

        let productNumber = quantityLocation
            ? String(amount)
            : String(productAmount[0]);

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
                if (res.data.updateQuantity.error) {
                    dispatch(addProductConfirmationModalState("error"));
                } else {
                    dispatch(
                        changeBasketAmounts(
                            productId,
                            changedProductAmount,
                            quantityLocation,
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(addProductConfirmationModalState("error"));
            });
    };
};

export const changeBasketAmounts = (
    productId,
    changedProductAmount,
    quantityLocation,
) => {
    return {
        type: type.CHANGE_BASKET_AMOUNTS,
        productId,
        changedProductAmount,
        quantityLocation,
    };
};

export const getBasketProducts = token => {
    return (dispatch, getState) => {
        getBasketProduct(token)
            .then(res => {
                let baskets = [];
                baskets.push(res.data.get);
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

export const addProductConfirmationModalState = state => {
    return {
        type: type.ADD_PRODUCT_CONFIRMATION_PRODUCT_STATE,
        state,
    };
};

export const changeDeleteAllProductsModalState = modalState => {
    return {
        type: type.CHANGE_DELETE_ALL_PRODUCTS_MODAL_STATE,
        modalState,
    };
};
