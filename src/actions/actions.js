import * as type from "../actions/types";

export const changeText = text => {
    return {
        type: type.CHANGE_TEXT,
        text
    };
};
