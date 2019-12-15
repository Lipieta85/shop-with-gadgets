import * as type from "../actions/types";

const initialState = {
    clientData: [],
    companyId: null,
    token: "",
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
        default:
            return state;
    }
};

export default clientDataReducer;
