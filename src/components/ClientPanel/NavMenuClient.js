import React, { useEffect } from "react";
import logo from "../../assets/images/filtron_logo.png";
import logo2 from "../../assets/images/WIX_logo.png";
import "../../assets/styles/nav-menu.scss";
import { Link } from "react-router-dom";
import { signOut } from "../../actions/authorization";
import { useDispatch, useSelector } from "react-redux";
import {
    setProductCategories,
    initProducts,
    setPage,
} from "../../actions/index";
import host from "../../api/host";
import host2 from "../../api/host2";
import { useTranslation } from "react-i18next";
import { ButtonToolbar, Button } from "react-bootstrap";
import NotificationModal from "./NotificationModal";
const NavMenu = () => {
    //const id = useSelector(state => state.cartReducer.productsCategory);
    const company = useSelector(state => state.clientDataReducer.companyId);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const { t } = useTranslation();
    const [modalShowPaidOrders, setModalShowPaidOrders] = React.useState(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    useEffect(() => {
        const active = document.querySelector(".nav-menu .active");
        if (active && category) {
            active.classList.remove("active");
            document.getElementById(`${category}`).classList.add("active");
        }
    }, [category]);
    const onSignout = () => {
        dispatch(signOut());
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
        if (e.target.id === "1") {
            allProductsHandler(e.target.id);
        } else {
            oneCategoryHandler(e.target.id);
        }
    };
    return (
        <div className="nav-menu fixed-top w-100 nav-shadow">
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
                        <ul className="navbar-nav ">
                            {window.location.pathname === `/` ? (
                                <ul className="nav nav-tabs">
                                    <li className="nav-item item-separated">
                                        <button
                                            id="1"
                                            className="nav-link active"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.Wszystkie`)}
                                        </button>
                                    </li>
                                    <li className="nav-item item-separated">
                                        <button
                                            id="30002140"
                                            className="nav-link"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.Biuro`)}
                                        </button>
                                    </li>
                                    <li className="nav-item item-separated">
                                        <button
                                            id="30002141"
                                            className="nav-link"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.Tekstylia`)}
                                        </button>
                                    </li>
                                    <li className="nav-item item-separated">
                                        <button
                                            id="30002142"
                                            className="nav-link"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.Gadżety`)}
                                        </button>
                                    </li>
                                    <li className="nav-item item-separated">
                                        <button
                                            id="30002143"
                                            className="nav-link"
                                            onClick={tabHandler}
                                        >
                                            {t(`Nav.MateriałyPromocyjne`)}
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {window.location.pathname === `/Order` ||
                            window.location.pathname === `/Basket` ||
                            window.location.pathname === `/Contact` ||
                            window.location.pathname === `/Regulations` ? (
                                <li className="nav-item">
                                    <a
                                        className="nav-link text-uppercase"
                                        href={`${host2}/`}
                                    >
                                        {t(`Nav.WróćDoStronyGłównej`)}{" "}
                                    </a>
                                </li>
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
                                        {t(`Nav.MojeKonto`)}
                                    </a>
                                    <div
                                        className="dropdown-menu text-uppercase"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/Basket"
                                        >
                                            Koszyk
                                        </Link>
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/OrderHistory"
                                        >
                                            {t(`Nav.ListaZamówień`)}
                                        </Link>
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            to="/BudgetHistory"
                                        >
                                            {t(`Nav.HistoriaBudżetu`)}
                                        </Link>
                                        {orderType === "S5" ? (
                                            <Link
                                                className="dropdown-item text-uppercase"
                                                onClick={showPaidOrders}
                                                to=""
                                            >
                                                {t(`Nav.ZamówieniaPłatne`)}
                                            </Link>
                                        ) : null}
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
                                                "PaidOrder.OstrzeżenieZamówieniePłatneNAV",
                                            )}
                                            header="Wniosek o zamówienia płatne"
                                        />
                                    </ButtonToolbar>
                                </li>
                            ) : null}
                            <li className="nav-item text-uppercase">
                                <a
                                    className="nav-link"
                                    onClick={onSignout}
                                    href={`${host}site/desktop`}
                                >
                                    {t(`Nav.Wyloguj`)}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};
export default NavMenu;
