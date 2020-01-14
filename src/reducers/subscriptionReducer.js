import * as type from "../actions/types";

const initialState = {
    subscribeState: 0,
};

const subscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SUBSCRIBE_RES:
            return {
                ...state,
                subscribeState: action.resState,
            };
        case type.RESET_SUBSCRIBE:
            return {
                ...state,
                subscribeState: action.number,
            };
        default:
            return state;
    }
};

export default subscriptionReducer;
