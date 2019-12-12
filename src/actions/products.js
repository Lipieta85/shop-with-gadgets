import * as type from "../actions/types";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

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

export const initProducts = (token, currentPage) => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;

        trackPromise(
            axios({
                method: "get",
                url: `https://mh-ecommerce-dev.bpower2.com/index.php/restApi/products/method/${company}/parameters/{"pagination":{"page":${currentPage}, "itemsPerPage":8}}`,
                headers: {
                    Authorization: token,
                },
            })
                .then(res => {
                    dispatch(setProducts(res.data));
                })
                .catch(error => {
                    dispatch(fetchProductsFailed());
                }),
        );
    };
};
