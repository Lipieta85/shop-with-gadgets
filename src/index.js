import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
//import rootReducer from "./reducers/rootReducer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
//import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware, createStore } from "redux";
//import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const history = createBrowserHistory();
// const persistConfig = {
//     key: "root",
//     storage,
// };
// let middleware = [];
// if (window.location.hostname === "localhost") {
//     middleware = [...middleware, logger, thunk];
// } else {
//     middleware = [...middleware, thunk];
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, applyMiddleware(...middleware));
// <PersistGate loading={null} persistor={persistor}></PersistGate>
// let persistor = persistStore(store);
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root"),
);
