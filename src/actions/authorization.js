import * as type from "../actions/types";

export const signIn = user => {
    return {
        type: type.SIGN_IN,
        // id,
        isAuth: user.isAuth,
    };
};
export const signOut = () => {
    return {
        type: type.SIGN_OUT,
    };
};
