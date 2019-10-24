import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/bootstrap/filtron.scss";
import HomePageContainer from "./containers/HomePageContainer";
import AdminPanelContainer from "./containers/AdminPanelContainer";
import OrderContainer from "./containers/OrderContainer";
import BasketContainer from "./containers/BasketContainer";
import ClientPanelContainer from "./containers/ClientPanelContainer";
import OrderEnd from "./components/OrderEnd/OrderEnd";
import PrivateRoute from "./authentication/PrivateRoute";
import { AuthContext } from "./authentication/Auth";

function App() {
    const [authTokens, setAuthTokens] = useState();

    const setTokens = data => {
        console.log(data);
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    };

    const PageNotFound = () => <h1>404 Not Found</h1>;
    return (
        <AuthContext.Provider
            value={(false, { authTokens, setAuthTokens: setTokens })}
        >
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePageContainer} />
                    <PrivateRoute
                        path="/admin"
                        component={AdminPanelContainer}
                    />
                    <PrivateRoute
                        path="/client"
                        component={ClientPanelContainer}
                    />
                    <PrivateRoute path="/Basket" component={BasketContainer} />
                    <PrivateRoute path="/Order" component={OrderContainer} />
                    <PrivateRoute path="/OrderEnd" component={OrderEnd} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
