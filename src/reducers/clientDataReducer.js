import * as type from "../actions/types";

const initialState = {
    clientData: [],
    companyId: null,
    confId: "",
    token: "",
    language: "",
    companyName: "",
    userName: "",
    currencyCode: "",
    marketingOrderType: "",
    remainingBudget: "",
    baseBudget: "",
    periodFrom: "",
    storePolicyStatus: 0,
    userIdNumber: 0,
    aliasUserId: 0,
};

const clientDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_CLIENT_DATA:
            return {
                ...state,
                clientData: action.data,
            };
        case type.COMPANY_ID:
            return {
                ...state,
                companyId: action.id,
            };
        case type.TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case type.GET_LANGUAGE:
            return {
                ...state,
                language: action.data,
            };
        case type.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.lang,
            };
        case type.COMPANY_NAME:
            return {
                ...state,
                companyName: action.name,
            };
        case type.USER_NAME:
            return {
                ...state,
                userName: action.name,
            };
        case type.IS_UE:
            return {
                ...state,
                isUE: action.data,
            };
        case type.SET_CURRENCY_CODE:
            return {
                ...state,
                currencyCode: action.code,
            };
        case type.GET_MARKETING_ORDER_TYPE:
            return {
                ...state,
                marketingOrderType: action.code,
            };
        case type.GET_REMAINING_BUDGET:
            return {
                ...state,
                remainingBudget: action.code,
            };
        case type.GET_PERIOD_FROM:
            return {
                ...state,
                periodFrom: action.code,
            };
        case type.GET_BASE_BUDGET:
            return {
                ...state,
                baseBudget: action.code,
            };
        case type.SET_STORE_POLICY_ACCEPTED_STATUS:
            return {
                ...state,
                storePolicyStatus: action.isAccepted,
            };
        case type.USER_ID_NUMBER:
            return {
                ...state,
                userIdNumber: action.number,
            };
        case type.SET_ALIAS_USER_ID:
            return {
                ...state,
                aliasUserId: action.id,
            };
        default:
            return state;
    }
};

export default clientDataReducer;
