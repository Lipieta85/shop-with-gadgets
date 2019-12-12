import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import Regulations from "./components/Footer/Regulations";
import Rodo from "./components/Footer/Rodo";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import ReactGA from "react-ga";
import { getUserData, getLinkToken } from "./api/index";
import { signIn } from "./actions/authorization";
import { clientData, companyId } from "./actions/index";
import queryString from "query-string";

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID, {
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export default withRouter(function App({ location }, props) {
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const dispatch = useDispatch();
    useEffect(() => {
        const { pathname } = location;

        setCurrentPath(pathname);
        initializeReactGA(currentPath);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (location.search) {
        const parsed = queryString.parse(location.search);
        dispatch(companyId(parsed.brand));
        getLinkToken(parsed.dt)
            .then(res => {
                const token = res.data.token.split(".");
                const userID = JSON.parse(atob(token[1]));
                sessionStorage.setItem("userID", userID.userId);
                sessionStorage.setItem("token", res.data.token);
                getUserData(res.data.token).then(res => {
                    dispatch(clientData(res.data));
                    dispatch(signIn({ isAuth: true }));
                });
            })
            .catch(err => console.log(err.response));
        //window.location.replace("http://192.168.0.105:3000/");
    }

    const isLoggedIn = useSelector(state => state.authReducer.isAuth);
    return (
        <>
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
        </>
    );
});
