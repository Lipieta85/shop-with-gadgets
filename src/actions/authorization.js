import * as type from "../actions/types";

export const signIn = user => {
    console.log(user);
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
