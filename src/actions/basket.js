import * as type from "../actions/types";
import axios from "axios";

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

// export const addItemToBasket = (id, productQuantity) => {
//     return (dispatch, getState) => {
//         let existed_item = getState().cartReducer.addedItems.find(
//             item => id === item.product.id,
//         );

//         if (existed_item) {
//             dispatch(addIfItemExist(id, productQuantity));
//         } else {
//             dispatch(addIfItemEmpty(id, productQuantity));
//         }
//     };
// };

export const addItemToBasket = (id, productQuantity, unit, token) => {
    let productAmount = Object.values(productQuantity);
    let productNumber = String(productAmount[0]);
    console.log(id, productNumber, unit);

    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        let existed_item = getState().cartReducer.addedItems.find(
            item => id === item.product.id,
        );
        console.log(basketId);

        if (basketId) {
            axios
                .put(
                    `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/addProduct/parameters/{“orderId”: ${basketId}, “bId”:W}`,
                    {
                        timeZone: "Pacific/Chatham",
                        //shipToNumber: "182887",
                        items: [
                            {
                                prodId: id,
                                uomPrimary: unit,
                                quantity: productNumber,
                            },
                        ],
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then(res => {
                    console.log(res);
                    if (existed_item) {
                        dispatch(addIfItemExist(id, productQuantity));
                    } else {
                        dispatch(addIfItemEmpty(id, productQuantity));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios
                .post(
                    `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/create/parameters/{"bId":"W"}`,
                    {
                        timeZone: "Pacific/Chatham",
                        shipToNumber: "182887",
                        items: [
                            {
                                prodId: id,
                                uomPrimary: unit,
                                quantity: productNumber,
                            },
                        ],
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then(res => {
                    console.log(res);
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

        console.log(basketId);

        if (basketId) {
            axios
                .delete(
                    `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/deleteProduct/parameters/{“orderId”:${basketId}}`,
                    {
                        "0": id,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    },
                )
                .then(res => {
                    console.log(res);
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

export const clearBasket = () => {
    return {
        type: type.CLEAR_BASKET,
    };
};

export const changeBasketQuantity = (productId, newProductAmount) => {
    return (dispatch, getState) => {
        const basketId = getState().cartReducer.basket;
        if (basketId) {
            axios
                .put(
                    `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/addProduct/parameters/{“orderId”: ${basketId}, “bId”:W}`,
                    {
                        timeZone: "Pacific/Chatham",
                        //shipToNumber: "182887",
                        items: [
                            {
                                prodId: productId,
                                uomPrimary: "SZ",
                                quantity: newProductAmount,
                            },
                        ],
                    },
                    {
                        headers: {
                            //Authorization: token,
                        },
                    },
                )
                .then(res => {
                    dispatch(changeBasketAmounts(productId, newProductAmount));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
};

export const changeBasketAmounts = (productId, newProductAmount) => {
    return {
        type: type.CHANGE_BASKET_AMOUNTS,
        productId,
        newProductAmount,
    };
};
