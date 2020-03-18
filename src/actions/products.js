import * as type from "../actions/types";
import {
    getAllProducts,
    changeProductsCategory,
    postSubscribe,
    searchProduct,
    getProductsCategories,
} from "../api";
import { setLock } from "../actions/index";

import host2 from "../api/host2";

export const setProducts = (products, actionGuid) => {
    // ---- saves guid  of actual products to avoid overwrite
    localStorage.setItem('actionGuid', actionGuid);
    return {
        type: type.SET_PRODUCTS,
        products: products,
    };
};
export const setQuantities = (products, actionGuid) => {
    // ---- prevents wrong product quantities overwriting when fast clicking
    if(actionGuid.toString() !== localStorage.getItem('actionGuid'))
        return;
    return {
        type: type.SET_PRODUCTS,
        products: products,
    };
};

export const getProductQuantities = (token, currentPage, number, actionGuid) =>{
    if(actionGuid === undefined) actionGuid = number;
    return (dispatch, getState) => {
        // ---- to hide getQuantities loading spinner + screenlock
        dispatch(setLock(false));
        const company = getState().clientDataReducer.companyId;
        const lang = getState().clientDataReducer.language;
        const aliasUserId = getState().clientDataReducer.aliasUserId;

        if(number && number.toString() !== actionGuid.toString()){
            changeProductsCategory(token, number, company, currentPage, lang, aliasUserId, true)
                .then(res => {
                    dispatch(setQuantities(res.data, actionGuid));
                    dispatch(setLock(true));
                })
                .catch(error => {
                    dispatch(fetchProductsFailed());
                    dispatch(setLock(true));
                });
        }else{
            getAllProducts(token, currentPage, company, lang, aliasUserId, true)
                .then(res => {
                    if (company === "filtron") {
                        if (res.data.filtron.error) {
                            window.location.replace(`${host2}/ServerError`);
                        } else {
                            dispatch(setQuantities(res.data, actionGuid));
                            dispatch(setLock(true));
                        }
                    } else if (company === "wix") {
                        if (res.data.wix.error) {
                            window.location.replace(`${host2}/ServerError`);
                        } else {
                            dispatch(setQuantities(res.data, actionGuid));
                            dispatch(setLock(true));
                        }
                    } else {
                        if (res.data.all.error) {
                            window.location.replace(`${host2}/ServerError`);
                        } else {
                            dispatch(setQuantities(res.data, actionGuid));
                            dispatch(setLock(true));
                        }
                    }
                })
                .catch(error => {
                    dispatch(fetchProductsFailed());
                    dispatch(setLock(true));
                });  
        }
    };
}

export const fetchProductsFailed = errorText => {
    return {
        type: type.FETCH_PRODUCTS_FAILED,
        errorText,
    };
};

export const initProducts = (token, currentPage) => {
    return (dispatch, getState) => {
        dispatch(setLock(true));
        const company = getState().clientDataReducer.companyId;
        const lang = getState().clientDataReducer.language;
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        const actionGuid = new Date().getTime();
 
        getAllProducts(token, currentPage, company, lang, aliasUserId)
            .then(res => {
                if (company === "filtron") {
                    if (res.data.filtron.error) {
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data, actionGuid));
                        //dispatch(getProductQuantities(token, currentPage, actionGuid));
                    }
                } else if (company === "wix") {
                    if (res.data.wix.error) {
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data, actionGuid));
                        //dispatch(getProductQuantities(token, currentPage, actionGuid));
                    }
                } else {
                    if (res.data.all.error) {
                        window.location.replace(`${host2}/ServerError`);
                    } else {
                        dispatch(setProducts(res.data, actionGuid));
                        //dispatch(getProductQuantities(token, currentPage, actionGuid));
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

        getProductsCategories(token, companyId, lang)
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
        dispatch(setLock(true));
        const company = getState().clientDataReducer.companyId;
        const lang = getState().clientDataReducer.language;
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        const actionGuid = new Date().getTime();

        changeProductsCategory(
            token,
            number,
            company,
            currentPage,
            lang,
            aliasUserId,
        )
            .then(res => {
                dispatch(setProducts(res.data, actionGuid));
                //dispatch(getProductQuantities(token, currentPage, number, actionGuid))
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

export const paginationType = typeVal => {
    return {
        type: type.SET_PAGINATION_TYPE,
        typeVal,
    };
};
