import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../actions/authorization";
import { ButtonToolbar, Button } from "react-bootstrap";
import NotificationModal from "../../ClientPanel/NotificationModal";
import "../../../assets/styles/nav-menu.scss";
import { useTranslation } from "react-i18next";

import logo from "../../../assets/images/filtron_logo.png";
import logo2 from "../../../assets/images/WIX_logo.png";

const ProductDetailsNavMenu = () => {
    const company = useSelector(state => state.clientDataReducer.companyId);
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const [modalShowPaidOrders, setModalShowPaidOrders] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onSignout = () => {
        dispatch(signOut());
    };
    const showPaidOrders = () => {
        setModalShowPaidOrders(true);
    };
    return (
        <div className="nav-menu fixed-top w-100 nav-shadow">
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-light">
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
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-uppercase"
                                    to="/"
                                >
                                    {t("Nav.WróćDoStronyGłównej")}{" "}
                                </Link>
                            </li>
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
                                    {t("Nav.MojeKonto")}
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
                                        {t("Nav.ListaZamówień")}
                                    </Link>
                                    <Link
                                        className="dropdown-item text-uppercase"
                                        to="/BudgetHistory"
                                    >
                                        {t("Nav.HistoriaBudżetu")}
                                    </Link>
                                    {orderType === "S5" ? (
                                        <Link
                                            className="dropdown-item text-uppercase"
                                            onClick={showPaidOrders}
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
                                    />
                                </ButtonToolbar>
                            </li>
                            <li className="nav-item text-uppercase">
                                <a
                                    className="nav-link"
                                    onClick={onSignout}
                                    href="/"
                                >
                                    {t("Nav.Wyloguj")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default ProductDetailsNavMenu;
