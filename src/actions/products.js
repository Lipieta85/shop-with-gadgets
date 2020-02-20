import * as type from "../actions/types";
import {
    getAllProducts,
    changeProductsCategory,
    postSubscribe,
    searchProduct,
    getProductsCategories,
} from "../api";
import host2 from "../api/host2";

export const setProducts = products => {
    return {
        type: type.SET_PRODUCTS,
        products: products,
    };
};

export const fetchProductsFailed = errorText => {
    return {
        type: type.FETCH_PRODUCTS_FAILED,
        errorText,
    };
};

export const initProducts = (token, currentPage) => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;
        const lang = getState().clientDataReducer.language;
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        getAllProducts(token, currentPage, company, lang, aliasUserId)
            .then(res => {
                console.log(res);
                if (company === "filtron") {
                    if (res.data.filtron.error) {
                        console.log(res);
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data));
                    }
                } else if (company === "wix") {
                    if (res.data.wix.error) {
                        console.log(res);
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data));
                    }
                } else {
                    if (res.data.all.error) {
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data));
                    }
                }
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};

export const initProductsCategories = token => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;
        let companyId =
            company !== "all" ? company.charAt(0).toUpperCase() : "";
        const lang = getState().clientDataReducer.language;
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        getProductsCategories(token, companyId, lang, aliasUserId)
            .then(res => {
                dispatch(setProductsCategories(res.data.categories));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const setProductsCategories = categories => {
    return {
        type: type.SET_PRODUCTS_CATEGORIES,
        categories,
    };
};

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
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        changeProductsCategory(
            token,
            number,
            company,
            currentPage,
            lang,
            aliasUserId,
        )
            .then(res => {
                dispatch(setProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};
export const searchProductPanel = (token, currentPage, lang, name) => {
    return (dispatch, getState) => {
        const company = getState().clientDataReducer.companyId;
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        searchProduct(token, currentPage, lang, name, company, aliasUserId)
            .then(res => {
                dispatch(setTypedProducts(res.data));
            })
            .catch(error => {
                dispatch(fetchProductsFailed());
            });
    };
};

export const setTypedProducts = typedProducts => {
    return {
        type: type.SET_TYPED_PRODUCTS,
        typedProducts,
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
