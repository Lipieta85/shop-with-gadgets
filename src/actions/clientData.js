import * as type from "../actions/types";
import { getStorePolicyAccepted, setAcceptPolicy } from "../api/index";
export const clientData = data => {
    return {
        type: type.ADD_CLIENT_DATA,
        data,
    };
};
export const isUE = data => {
    return {
        type: type.IS_UE,
        data,
    };
};
export const companyId = id => {
    return {
        type: type.COMPANY_ID,
        id,
    };
};

export const setToken = token => {
    return {
        type: type.TOKEN,
        token,
    };
};
export const getLang = data => {
    return {
        type: type.GET_LANGUAGE,
        data,
    };
};
export const changeLanguage = lang => {
    return {
        type: type.CHANGE_LANGUAGE,
        lang,
    };
};
export const companyName = name => {
    return {
        type: type.COMPANY_NAME,
        name,
    };
};
export const userName = name => {
    return {
        type: type.USER_NAME,
        name,
    };
};
export const userIdNumber = number => {
    return {
        type: type.USER_ID_NUMBER,
        number,
    };
};
export const setCurrencyCode = code => {
    return {
        type: type.SET_CURRENCY_CODE,
        code,
    };
};

export const getMarketingOrderType = code => {
    return {
        type: type.GET_MARKETING_ORDER_TYPE,
        code,
    };
};
export const getRemainingBudget = code => {
    return {
        type: type.GET_REMAINING_BUDGET,
        code,
    };
};
export const getBaseBudget = code => {
    return {
        type: type.GET_BASE_BUDGET,
        code,
    };
};
export const getPeriodFrom = code => {
    return {
        type: type.GET_PERIOD_FROM,
        code,
    };
};

export const clearState = () => {
    return {
        type: type.CLEAR_STATE,
    };
};

export const isStorePolicyAccepted = token => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        getStorePolicyAccepted(token, aliasUserId)
            .then(res => {
                dispatch(
                    setStorePolicyAcceptedStatus(
                        res.data.wixIsStorePolicyAccepted,
                    ),
                );
            })
            .catch(error => {
                dispatch(setStorePolicyAcceptedStatus("error"));
            });
    };
};

export const setStorePolicyAcceptedStatus = isAccepted => {
    return {
        type: type.SET_STORE_POLICY_ACCEPTED_STATUS,
        isAccepted,
    };
};

export const acceptPolicy = token => {
    return (dispatch, getState) => {
        const aliasUserId = getState().clientDataReducer.aliasUserId;
        setAcceptPolicy(token, aliasUserId)
            .then(res => {
                if (res.data.wixAcceptStorePolicy === false) {
                    dispatch(setStorePolicyAcceptedStatus("error"));
                } else {
                    dispatch(
                        setStorePolicyAcceptedStatus(
                            res.data.wixAcceptStorePolicy,
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(setStorePolicyAcceptedStatus("error"));
            });
    };
};

export const setAliasUserId = id => {
    return {
        type: type.SET_ALIAS_USER_ID,
        id,
    };
};

export const setDeliveryAddress = (address) => {
    return {
        type: type.SET_DELIVERY_ADDRESS,
        address
    }
}

export const setDeliveryAddress2 = (address) => {
    return {
        type: type.SET_SECOND_DELIVERY_ADDRESS,
        address
    }
}