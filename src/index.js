import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
//import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const persistConfig = {
    key: "root",
    storage
};
let middleware = [];
if (window.location.hostname === "localhost") {
    middleware = [...middleware, logger, thunk];
} else {
    middleware = [...middleware, thunk];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));

let persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
