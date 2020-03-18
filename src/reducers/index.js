import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import pageReducer from "./pageReducer";
import searchPanelReducer from "./searchPanelReducer";
import clientDataReducer from "./clientDataReducer";
import subscriptionReducer from "./subscriptionReducer";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
    authReducer,
    cartReducer,
    orderReducer,
    pageReducer,
    clientDataReducer,
    subscriptionReducer,
    searchPanelReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "SIGN_OUT") {
        localStorage.removeItem("userID");
        storage.removeItem("persist:root");
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
