import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/font-awesome/css/font-awesome.min.css";
//import rootReducer from "./reducers/rootReducer";
import cartReducer from "./reducers/cartReducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { loadState } from "./reducers/localStorage";
// import logger from "redux-logger";

// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";

// const persistConfig = {
//     key: "root",
//     storage,
//     stateReconciler: hardSet,
// };

// let middleware = [];
// if (window.location.hostname === "localhost") {
//     middleware = [...middleware, logger];
// } else {
//     middleware = [...middleware];
// }

// const persistedReducer = persistReducer(persistConfig, cartReducer);
// const store = createStore(
//     persistedReducer,
//     composeWithDevTools(applyMiddleware(...middleware)),
// );
// let persistor = persistStore(store);
// <PersistGate loading={null} persistor={persistor}></PersistGate>
//const persistedState = loadState();

const store = createStore(
    cartReducer,
    //persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
