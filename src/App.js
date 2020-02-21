import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/styles/bootstrap/filtron.scss";
//import HomePageContainer from "./containers/HomePageContainer";
// import AdminPanelContainer from "./containers/AdminPanelContainer";
import OrderContainer from "./containers/OrderContainer";
import BasketContainer from "./containers/BasketContainer";
import ClientPanelContainer from "./containers/ClientPanelContainer";
import OrderEndContainer from "./containers/OrderEndContainer";
import ProductDetails from "./components/ClientPanel/ProductDetails/ProductDetails";
import PrivateRoute from "./authentication/PrivateRoute";
import PageNotFound from "./components/NotFound";
import ServerError from "./components/ServerError";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer/Footer";
import Regulations from "./components/Footer/Regulations";
import Contact from "./components/Footer/Contact";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import BudgetHistory from "./components/BudgetHistory/BudgetHistory";
import ReactGA from "react-ga";
import { getUserData, getLinkToken } from "./api/index";
import { signIn } from "./actions/authorization";
import {
    clientData,
    companyId,
    setToken,
    setBudget,
    getLang,
    userName,
    isUE,
    companyName,
    setCurrencyCode,
    getMarketingOrderType,
    getRemainingBudget,
    getBaseBudget,
    getPeriodFrom,
    isStorePolicyAccepted,
    userIdNumber,
    clearState,
    setAliasUserId,
} from "./actions/index";
import queryString from "query-string";
import host from "./api/host";
import host2 from "./api/host2";
import { useTranslation } from "react-i18next";

function initializeReactGA() {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID, {
        gaOptions: {
            siteSpeedSampleRate: 100,
        },
    });
    ReactGA.pageview(window.location.pathname + window.location.search);
}

export default withRouter(function App({ location }, props) {
    const company = useSelector(state => state.clientDataReducer.companyId);
    const lang = useSelector(state => state.clientDataReducer.language);
    const parsed = queryString.parse(location.search);

    const [currentPath, setCurrentPath] = useState(location.pathname);
    const dispatch = useDispatch();

    const { i18n } = useTranslation();

    window.history.pushState(null, null, window.location.pathname);

    useEffect(() => {
        const { pathname } = location;
        setCurrentPath(pathname);
        initializeReactGA(currentPath);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.body.classList.remove("theme-dark", "theme-light");
        if (company === "wix") {
            document.body.classList.add("theme-dark");
        } else {
            document.body.classList.add("theme-light");
        }
    }, [company]);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [i18n, location.search, lang]);

    useEffect(() => {
        if (location.search) {
            dispatch(clearState());
            dispatch(companyId(parsed.brand));
            dispatch(setAliasUserId(parsed.aliasUserId));
            getLinkToken(parsed.dt)
                .then(res => {
                    const token = res.data.token;
                    const tokenParts = res.data.token.split(".");
                    const userID = JSON.parse(atob(tokenParts[1]));
                    localStorage.setItem("userID", userID.userId);
                    localStorage.setItem("token", res.data.token);
                    getUserData(res.data.token, parsed.aliasUserId).then(res => {
                        console.log(res);
                        if (res.data.getWixClientData.error) {
                            console.log(res);
                            return window.location.replace(
                                `${host2}/ServerError`,
                            );
                        } else {
                            dispatch(getLang(parsed.lang));
                            dispatch(
                                setBudget(
                                    res.data.getWixClientData.budget
                                        ? res.data.getWixClientData.budget
                                              .remainingBudget
                                        : "",
                                ),
                            );
                            dispatch(setToken(token));
                            dispatch(clientData(res.data));
                            dispatch(
                                companyName(
                                    res.data.getWixClientData.data.name,
                                ),
                            );
                            dispatch(
                                userIdNumber(
                                    res.data.getWixClientData.data.exId,
                                ),
                            );
                            dispatch(
                                userName(res.data.getWixClientData.userLogin),
                            );
                            dispatch(isUE(res.data.getWixClientData.data.isUE));
                            dispatch(isStorePolicyAccepted(token));
                            dispatch(
                                setCurrencyCode(
                                    res.data.getWixClientData.budget
                                        .currencyCode,
                                ),
                            );
                            dispatch(
                                getRemainingBudget(
                                    res.data.getWixClientData.budget
                                        .remainingBudget,
                                ),
                            );
                            dispatch(
                                getBaseBudget(
                                    res.data.getWixClientData.budget.baseBudget,
                                ),
                            );
                            dispatch(
                                getPeriodFrom(
                                    res.data.getWixClientData.budget.period
                                        .from,
                                ),
                            );
                            dispatch(
                                getMarketingOrderType(
                                    res.data.getWixClientData.data
                                        .marketingOrderType,
                                ),
                            );
                            dispatch(signIn({ isAuth: true }));
                        }
                    });
                })
                .catch(err => console.log(err));
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (
            !location.search &&
            window.location.pathname !== `/404` &&
            window.location.pathname !== `/ServerError`
        ) {
            if (localStorage.getItem("token") === null) {
                window.location.replace(`${host}/site/desktop`);
            }
        }
    }, [location.search]);

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
                            <ClientPanelContainer {...render} />
                        )
                    }
                />
                {/* <PrivateRoute path="/admin" component={AdminPanelContainer} /> */}
                <PrivateRoute path="/Basket" component={BasketContainer} />
                <PrivateRoute path="/Order" component={OrderContainer} />
                <PrivateRoute path="/OrderEnd" component={OrderEndContainer} />
                <PrivateRoute path="/OrderHistory" component={OrderHistory} />
                <PrivateRoute path="/BudgetHistory" component={BudgetHistory} />
                <PrivateRoute path="/Regulations" component={Regulations} />
                <PrivateRoute path="/Contact" component={Contact} />
                <PrivateRoute path="/product/:id" component={ProductDetails} />
                <Route path="/ServerError" component={ServerError} />
                <Route path="*" component={PageNotFound} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </>
    );
});
