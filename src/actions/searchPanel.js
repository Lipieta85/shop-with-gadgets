import * as type from "../actions/types";

export const setSearchText = data => {
    return {
        type: type.SET_SEARCH_FIELD,
        data,
    };
};
