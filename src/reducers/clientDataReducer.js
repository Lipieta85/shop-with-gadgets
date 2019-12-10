import * as type from "../actions/types";

const initialState = {
    clientData: [],
};

const clientDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_CLIENT_DATA:
            return {
                ...state,
                clientData: state.clientData.concat(action.data),
            };
        default:
            return state;
    }
};

export default clientDataReducer;
