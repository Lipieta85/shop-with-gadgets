import * as type from "../actions/types";

export const clientData = data => {
    return {
        type: type.ADD_CLIENT_DATA,
        data,
    };
};
