import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import pageReducer from "./pageReducer";
import clientDataReducer from "./clientDataReducer";
import storage from 'redux-persist/lib/storage/session';

const appReducer = combineReducers({
    authReducer,
    cartReducer,
    orderReducer,
    pageReducer,
    clientDataReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "SIGN_OUT") {
        storage.removeItem('persist:root')
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer
