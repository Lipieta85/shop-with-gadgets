import * as type from "../actions/types";

export const setLock = data =>{
    return {
        type: type.SET_LOCK,
        data,
    };
}

export const nextPage = () => {
    return {
        type: type.NEXT_PAGE,
    };
};

export const prevPage = () => {
    return {
        type: type.PREV_PAGE,
    };
};

export const setPage = value => {
    return {
        type: type.SET_PAGE,
        value: value,
    };
};
