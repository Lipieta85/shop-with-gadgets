import * as type from "../actions/types";

export const clientData = data => {
    return {
        type: type.ADD_CLIENT_DATA,
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
