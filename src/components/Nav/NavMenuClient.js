import React, { useEffect, useState } from "react";
import logo from "../../assets/images/filtron_logo.png";
import logo2 from "../../assets/images/WIX_logo.png";
import "../../assets/styles/nav-menu.scss";
import { Link } from "react-router-dom";
import { signOut } from "../../actions/authorization";
import { useDispatch, useSelector } from "react-redux";
import {
    setProductCategories,
    initProductsCategories,
    getClientOrdersHistory,
    getClientBudgetHistory,
    initProducts,
    setPage,
    changeLanguage,
    paginationType,
    setSearchText,
} from "../../actions/index";
import host from "../../api/host";
import { useTranslation } from "react-i18next";
import { ButtonToolbar, Button } from "react-bootstrap";
import NotificationModal from "../ClientPanel/modals/NotificationModal";
import PolicyAcceptedModal from "../ClientPanel/modals/PolicyAcceptedModal";

const NavMenu = () => {
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const lang = useSelector(state => state.clientDataReducer.language);
    const company = useSelector(state => state.clientDataReducer.companyId);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const availableProductsCategory = useSelector(
        state => state.cartReducer.availableProductsCategory,
    );
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const { t } = useTranslation();
    const [modalShowPaidOrders, setModalShowPaidOrders] = React.useState(false);
    const [policyModal, setPolicyModal] = useState(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const active = document.querySelector(".navbar .active");
        if (active && category) {
            active.classList.remove("active");
            document.getElementById(`${category}`).classList.add("active");
        }
    }, [category, currentPage]);

    const onSignout = () => {
        dispatch(signOut());
        window.location.replace(`${host}site/desktop`);
    };
    const oneCategoryHandler = id => {
        dispatch(setProductCategories(id));
        dispatch(setPage(1));
    };
    const allProductsHandler = id => {
        dispatch(setProductCategories(id));
        dispatch(initProducts(token, Number(id)));
        dispatch(setPage(1));
    };
    const showPaidOrders = () => {
        setModalShowPaidOrders(true);
    };
    const tabHandler = e => {
        dispatch(setSearchText(""));
        if (e.target.id === "1" || e.target.id === "2") {
            dispatch(paginationType("back"));
            allProductsHandler("1");
        } else {
            dispatch(paginationType("front"));
            oneCategoryHandler(e.target.id);
        }
    };

    const changeLangHandler = event => {
        dispatch(changeLanguage(event.target.value));
        dispatch(initProducts(token, 1));
        dispatch(initProductsCategories(token));
        if(window.location.href.includes("OrderHistory")) {
            dispatch(getClientOrdersHistory(token))
        }
        if(window.location.href.includes("BudgetHistory")) {
            dispatch(getClientBudgetHistory(token));
        }
    }

    const changePolicyModalStatus = () => {
        if (window.location.pathname === "/Regulations") {
            setPolicyModal(true);
        }
    };

    return (
        <div className="nav-menu fixed-top w-100 nav-shadow">
            <PolicyAcceptedModal modalStatus={policyModal} />
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-light primary-color">
                    <Link to="/" className="navbar-brand">
                        <img
                            src={
                                company === "filtron" || company === "all"
                                    ? logo
                                    : logo2
                            }
                            alt="company-logo"
                            onClick={tabHandler}
                            id="2"
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span
                            className="navbar-toggler-icon"
                            cursor="pointer"
                        ></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        {window.location.pathname === `/` ? (
                            <div className="navbar-nav ">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item item-separated">
                                        <button
                                            id="1"
                                            className="nav-link active"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.All`)}
                                        </button>
                                    </li>
                                    {availableProductsCategory ? 
                                        availableProductsCategory.map(
                                            (position, i) => {
                                                return (
                                                    <li className="nav-item item-separated" key={i}>
                                                        <button
                                                            id={`${position.SLO_ID}`}
                                                            className="nav-link"
                                                            onClick={
                                                                tabHandler
                                                            }
                                                        >
                                                            {`${position.translation}`}
                                                        </button>
                                                    </li>
                                                );
                                            },
                                        )
                                    : null}
                                </ul>
                            </div>
                        ) : null}
                        <ul className="navbar-nav ml-auto">
                            {window.location.pathname !== `/` &&
                            window.location.pathname !== `/OrderEnd` ? (
                                <Link
                                    className="nav-link text-uppercase"
                                    to={`/`}
                                    onClick={changePolicyModalStatus}
                                >
                                    {t(`Nav.GoToTheMainPage`)}
                                </Link>
                            ) : null}
                            {window.location.pathname !== `/Regulations` ? (
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle text-uppercase"
                                        href="/"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onClick={e => e.preventDefault}
                                    >
                                        {t(`Nav.Account`)}
                                    </a>
                                    <div
                                        className="dropdown-menu text-uppercase"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/Basket"
                                        >
                                            {t(`Nav.Basket`)}
                                        </Link>
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/OrderHistory"
                                        >
                                            {t(`Nav.ListOfOrders`)}
                                        </Link>
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/BudgetHistory"
                                        >
                                            {t(`Nav.BudgetHistory`)}
                                        </Link>
                                        {orderType === "S5" ? (
                                            <button
                                                className="dropdown-item text-uppercase"
                                                onClick={showPaidOrders}
                                            >
                                                {t(`Nav.PaidOrders`)}
                                            </button>
                                        ) : null}
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            onClick={onSignout}
                                            to=""
                                            style={{ cursor: "pointer" }}
                                        >
                                            {t(`Nav.LogOut`)}
                                        </Link>
                                    </div>
                                    <ButtonToolbar className="invisible">
                                        <Button
                                            className="availability-check unselectable paid-orders-modal"
                                            id="paid-orders-modal"
                                        ></Button>
                                        <NotificationModal
                                            show={modalShowPaidOrders}
                                            onHide={() =>
                                                setModalShowPaidOrders(false)
                                            }
                                            text={t(
                                                "PaidOrder.NoProductsWarning",
                                            )}
                                            header={t(
                                                "Button.PaidOrderApplication",
                                            )}
                                        />
                                    </ButtonToolbar>
                                </li>
                            ) : null}
                            <li>
                                <select
                                    className="custom-select lang-select-btn"
                                    value={lang}
                                    onChange={changeLangHandler}
                                >
                                    <option value="pl">PL</option>
                                    <option value="en">EN</option>
                                    <option value="ru">RU</option>
                                    <option value="it">IT</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};
export default NavMenu;
