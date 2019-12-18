import * as type from "../actions/types";
import axios from "../utils/axios";
import { mapKeys } from "lodash";
import { trackPromise } from "react-promise-tracker";

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

export const addItemToBasket = (id, productQuantity, unit, token) => {
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

        let existed_item = getState().cartReducer.addedItems.find(
            item => id === item.product.id,
        );

        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/addProduct/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`;
        if (basketId) {
            trackPromise(
                axios({
                    method: "put",
                    url: url,
                    headers: {
                        Authorization: token,
                    },
                    data: {
                        timeZone: "Pacific/Chatham",
                        shipToNumber: deliveryAddress[0].key,
                        items: [
                            {
                                prodId: id,
                                uomPrimary: unit,
                                quantity: productNumber,
                            },
                        ],
                    },
                })
                    .then(res => {
                        if (existed_item) {
                            dispatch(addIfItemExist(id, productQuantity));
                        } else {
                            dispatch(addIfItemEmpty(id, productQuantity));
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    }),
            );
        } else {
            const urlPost = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/create/parameters/{"bId":"${companyId}"}`;
            trackPromise(
                axios({
                    method: "post",
                    url: urlPost,
                    headers: {
                        Authorization: token,
                    },
                    data: {
                        timeZone: "Pacific/Chatham",
                        shipToNumber: deliveryAddress[0].key,
                        items: [
                            {
                                prodId: id,
                                uomPrimary: unit,
                                quantity: productNumber,
                            },
                        ],
                    },
                })
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
                    }),
            );
        }
    };
};

export const addBasketId = id => {
    return { type: type.ADD_BASKET_ID, id };
};

export const removeCart = (token, id) => {
    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;

        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/deleteProduct/parameters/{"orderId":${basketId}}`;
        if (basketId) {
            axios({
                method: "delete",
                url: url,
                headers: {
                    Authorization: token,
                },
                data: {
                    "0": id,
                },
            })
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

export const changeBasketQuantity = (productId, newProductAmount, unit) => {
    return (dispatch, getState) => {
        let basketId = getState().cartReducer.basket;
        //let addedItems = getState().cartReducer.addedItems;
        let company = getState().clientDataReducer.companyId;
        let companyId = company.charAt(0).toUpperCase();

        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/updateQuantity/parameters/{"orderId": ${basketId}, "bId":"${companyId}"}`;
        axios({
            method: "put",
            url: url,
            data: {
                timeZone: "Pacific/Chatham",
                shipToNumber: "182887",
                items: [
                    {
                        prodId: productId,
                        uomPrimary: unit,
                        quantity: newProductAmount,
                    },
                ],
            },
        })
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
        const url = `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/cart/method/get/parameters/{"clientId":"16"}`;
        axios({
            method: "get",
            url: url,
            headers: {
                Authorization: token,
            },
        })
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
