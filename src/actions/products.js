import * as type from "../actions/types";
import {
    getAllProducts,
    getProductsCategories,
    changeProductsCategory,
    postSubscribe,
} from "../api";

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

        getAllProducts(token, currentPage, company)
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};

export const initProductsCategories = token => {
    return (dispatch, getState) => {
        getProductsCategories(token)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
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

        changeProductsCategory(token, company, number)
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};
export const sendNotification = (token, id, email, language) => {
    return dispatch => {
        postSubscribe(token, id, email, language)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    };
};
