export default (state = { isAuth: false }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                // userID: action.userID,
                isAuth: action.isAuth,
            };
        case "SIGN_OUT":
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("")
            return {
                ...state,
                isAuth: false,
            };
        default:
            return state;
    }
};
