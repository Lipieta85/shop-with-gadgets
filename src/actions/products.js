import * as type from "../actions/types";
import {
    getAllProducts,
    changeProductsCategory,
    postSubscribe,
    searchProduct,
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
        const lang = getState().clientDataReducer.language;

        getAllProducts(token, currentPage, company, lang)
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};

// export const initProductsCategories = token => {
//     return (dispatch, getState) => {
//         getProductsCategories(token)
//             .then(res => {
//                 console.log(res);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };
// };

export const setProductCategories = number => {
    return {
        type: type.SET_PRODUCT_CATEGORY,
        number,
    };
};

export const changeProductCategory = (token, number, currentPage, lang) => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;
        const lang = getState().clientDataReducer.language;
        changeProductsCategory(token, number, company, currentPage, lang)
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};
export const searchProductPanel = (token, lang, name) => {
    return dispatch => {
        searchProduct(token, lang, name)
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
