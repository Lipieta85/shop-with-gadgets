import * as type from "../actions/types";

const initialState = {
    test: "test"
};

const rootReducer = (state = initialState, actions) => {
    if (actions.type === type.CHANGE_TEXT) {
        return { ...state, test: actions.text };
    }
    return state;
};

export default rootReducer;
