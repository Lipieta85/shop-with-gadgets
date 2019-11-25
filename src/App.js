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
import Footer from "./components/Footer/Footer";
import Regulations from "./components/Footer/Regulations";
import Rodo from "./components/Footer/Rodo";
import OrderHistory from "./components/OrderHistory/OrderHistory";

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
                <PrivateRoute path="/OrderHistory" component={OrderHistory} />
                <PrivateRoute path="/Regulations" component={Regulations} />
                <PrivateRoute path="/Rodo" component={Rodo} />
                <PrivateRoute path="/product/:id" component={ProductDetails} />
                <Route path="*" component={PageNotFound} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
