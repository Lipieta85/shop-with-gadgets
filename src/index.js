import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
//import rootReducer from "./reducers/rootReducer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "./i18next";

const history = createBrowserHistory();
const persistConfig = {
    key: "root",
    storage: storage
};
let middleware = [];
if (window.location.hostname === "localhost") {
    middleware = [...middleware, logger, thunk];
} else {
    middleware = [...middleware, thunk];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);

let persistor = persistStore(store);

if (
    window.location.href.includes("brand") &&
    localStorage.getItem("token") !== null
) {
    localStorage.removeItem("token");
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <Suspense fallback={<div>"Loading"</div>}>
                    <App />
                </Suspense>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root"),
);
