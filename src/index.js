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
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();

const store = createStore(
    cartReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(
    throttle(() => {
        console.log(store.getState());
        saveState(store.getState());
    }),
    1000,
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);
