import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
    authReducer,
    cartReducer,
    orderReducer,
    pageReducer,
});
