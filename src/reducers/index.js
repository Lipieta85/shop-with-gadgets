import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import pageReducer from "./pageReducer";
import clientDataReducer from "./clientDataReducer";

export default combineReducers({
    authReducer,
    cartReducer,
    orderReducer,
    pageReducer,
    clientDataReducer,
});
