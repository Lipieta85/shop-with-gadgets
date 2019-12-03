import * as type from "../actions/types";

const initialState = {
    currentPage: 1,
};

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.NEXT_PAGE:
            return {
                ...state,
                currentPage: state.currentPage + 1,
            };
        case type.PREV_PAGE:
            return {
                ...state,
                currentPage: state.currentPage - 1,
            };
        case type.SET_PAGE:
            return {
                ...state,
                currentPage: (state.currentPage = action.value),
            };
        default:
            return state;
    }
};

export default pageReducer;
