import * as type from "../actions/types";
import axios from "axios";

export const setProducts = products => {
    return {
        type: type.SET_PRODUCTS,
        products: products,
    };
};

export const fetchProductsFailed = () => {
    return {
        type: type.FETCH_PRODUCTS_FAILED,
    };
};

export const initProducts = token => {
    return dispatch => {
        axios({
            method: "get",
            url: `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/products/method/wix/parameters/{"pagination":{"page":1, "itemsPerPage":100}}`,
            headers: {
                Authorization: token,
            },
        })
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};
