import * as type from "../actions/types";
import axios from "../utils/axios";
import { trackPromise } from "react-promise-tracker";
import host from "../api/host";

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
                url: `${host}index.php/restApi/products/method/${company}/parameters/{"pagination":{"page":${currentPage}, "itemsPerPage":8}}`,
                headers: {
                    Authorization: token,
                },
            })
                .then(res => {
                    console.log(res);
                    dispatch(setProducts(res.data));
                })
                .catch(error => {
                    dispatch(fetchProductsFailed());
                }),
        );
    };
};

export const initProductsCategories = (token, currentPage) => {
    return (dispatch, getState) => {
        //const company = getState().clientDataReducer.companyId;

        trackPromise(
            axios({
                method: "get",
                url: `${host}index.php/restApi/products/method/categories`,
                headers: {
                    Authorization: token,
                },
            })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                }),
        );
    };
};

export const setProductCategories = number => {
    return {
        type: type.SET_PRODUCT_CATEGORY,
        number,
    };
};

export const changeProductCategory = (token, number) => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;

        const url = `${host}index.php/restApi/products/method/${company}/parameters/{"category": ${Number(
            number,
        )}}`;
        trackPromise(
            axios({
                method: "get",
                url: url,
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
