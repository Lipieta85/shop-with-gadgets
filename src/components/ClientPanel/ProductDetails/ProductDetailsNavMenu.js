import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../actions/authorization";
import { ButtonToolbar, Button } from "react-bootstrap";
import host from "../../../api/host";
import NotificationModal from "../modals/NotificationModal";
import "../../../assets/styles/nav-menu.scss";
import { useTranslation } from "react-i18next";
import { changeLanguage, initProducts } from "../../../actions/index";
import logo from "../../../assets/images/filtron_logo.png";
import logo2 from "../../../assets/images/WIX_logo.png";

const ProductDetailsNavMenu = () => {
    const lang = useSelector(state => state.clientDataReducer.language);
    const company = useSelector(state => state.clientDataReducer.companyId);
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const [modalShowPaidOrders, setModalShowPaidOrders] = React.useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const onSignout = () => {
        dispatch(signOut());
        window.location.replace(`${host}site/desktop`);
    };
    const changeLangHandler = event => {
        dispatch(changeLanguage(event.target.value));
        dispatch(initProducts(token, 1));
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
                                        {t("Nav.Koszyk")}
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
                                            to=""
                                        >
                                            {t(`Nav.ZamówieniaPłatne`)}
                                        </Link>
                                    ) : null}
                                    <Link
                                        className="dropdown-item text-uppercase"
                                        onClick={onSignout}
                                        to=""
                                    >
                                        {t(`Nav.Wyloguj`)}
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
                                            "PaidOrder.OstrzeżenieZamówieniePłatneNAV",
                                        )}
                                        header={t(
                                            "Button.WniosekZamówieniePłatne",
                                        )}
                                    />
                                </ButtonToolbar>
                            </li>
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
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default ProductDetailsNavMenu;
