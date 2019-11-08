import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/bootstrap/filtron.scss";
import HomePageContainer from "./containers/HomePageContainer";
// import AdminPanelContainer from "./containers/AdminPanelContainer";
import OrderContainer from "./containers/OrderContainer";
import BasketContainer from "./containers/BasketContainer";
import ClientPanelContainer from "./containers/ClientPanelContainer";
import OrderEndContainer from "./containers/OrderEndContainer";
import ProductDetails from "./components/ClientPanel/ProductDetails/ProductDetails";
import PrivateRoute from "./authentication/PrivateRoute";
import PageNotFound from "./components/NotFound";
import { useSelector } from "react-redux";

function App() {
    const isLoggedIn = useSelector(state => state.authReducer.isAuth);
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={render =>
                        isLoggedIn ? (
                            <ClientPanelContainer {...render} />
                        ) : (
                            <HomePageContainer {...render} />
                        )
                    }
                />
                {/* <PrivateRoute path="/admin" component={AdminPanelContainer} /> */}
                <PrivateRoute path="/Basket" component={BasketContainer} />
                <PrivateRoute path="/Order" component={OrderContainer} />
                <PrivateRoute path="/OrderEnd" component={OrderEndContainer} />
                {/* <PrivateRoute
                    path="/client"
                    component={ClientPanelContainer}
                ></PrivateRoute> */}
                <PrivateRoute path="/product/:id" component={ProductDetails} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default App;
