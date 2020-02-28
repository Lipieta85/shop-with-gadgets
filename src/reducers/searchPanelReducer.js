import * as type from "../actions/types";

const initialState = {
    searchText:"" 
};

const searchPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_SEARCH_FIELD:
            return{
                ...state,
                searchText:action.data
            }
        default:
            return state;
    }
};

export default searchPanelReducer;
