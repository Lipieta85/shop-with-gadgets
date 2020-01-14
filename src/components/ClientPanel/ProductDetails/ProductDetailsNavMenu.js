import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../actions/authorization";

import logo from "../../../assets/images/filtron_logo.png";
import logo2 from "../../../assets/images/WIX_logo.png";

const ProductDetailsNavMenu = () => {
    const company = useSelector(state => state.clientDataReducer.companyId);

    const dispatch = useDispatch();

    const onSignout = () => {
        dispatch(signOut());
    };

    return (
        <div className="nav-menu fixed-top w-100 nav-shadow">
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={company === "filtron" || "all" ? logo : logo2}
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
                                    Wróć do strony głównej{" "}
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
                                    Moje Konto
                                </a>
                                <div
                                    className="dropdown-menu text-uppercase"
                                    aria-labelledby="navbarDropdown"
                                >
                                    {/* <a
                                        className="dropdown-item text-uppercase"
                                        href="/"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Edycja Konta
                                    </a> */}
                                    <Link
                                        className="dropdown-item text-uppercase"
                                        to="/OrderHistory"
                                    >
                                        Lista zamówień
                                    </Link>
                                    <Link
                                        className="dropdown-item text-uppercase"
                                        to="/BudgetHistory"
                                    >
                                        Historia budżetu
                                    </Link>
                                    <Link
                                        className="dropdown-item text-uppercase"
                                        to="/"
                                    >
                                        Zamówienia Płatne
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item text-uppercase">
                                <a
                                    className="nav-link"
                                    onClick={onSignout}
                                    href="/"
                                >
                                    Wyloguj
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
