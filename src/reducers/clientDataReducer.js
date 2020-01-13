import * as type from "../actions/types";

const initialState = {
    clientData: [],
    companyId: null,
    token: "",
    language: "",
    companyName: "",
    userName: "",
    currencyCode: ""
};

const clientDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_CLIENT_DATA:
            return {
                ...state,
                clientData: state.clientData.concat(action.data),
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
        case type.SET_CURRENCY_CODE:
            return {
                ...state,
                currencyCode: action.code
            }
        default:
            return state;
    }
};

export default clientDataReducer;
