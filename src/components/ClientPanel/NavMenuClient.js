import React from "react";
import "../../assets/styles/nav-menu.scss";
import logo from "../../assets/images/logo_benefit.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const NavMenu = () => {
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);

    return (
        <div className="nav-menu fixed-top w-100">
            <div className="container-fluid border-bottom border-primary">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-sm-6 col-md-5 col-lg-3">
                        <div className="logo-div p-3">
                            <Link to="/">
                                <img
                                    src={logo}
                                    className="logo-media"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-7 col-lg-7">
                        <nav className="navbar navbar-expand-lg navbar-light w-100">
                            <button
                                className="navbar-toggler mt-2"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarNavDropdown"
                                aria-controls="navbarNavDropdown"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse p-2 w-100"
                                id="navbarNavDropdown"
                            >
                                <ul className="navbar-nav text-right w-75 ml-auto d-flex justify-content-around">
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            className="nav-link font-weight-bold text-uppercase"
                                        >
                                            Wróć do Produktów
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="/"
                                            id="navbarDropdown"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Kategorie
                                        </a>
                                        <div
                                            className="dropdown-menu border border-primary"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <a
                                                className="dropdown-item"
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Ubrania
                                            </a>
                                            <a
                                                className="dropdown-item"
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Długopisy
                                            </a>
                                            <div className="dropdown-divider"></div>
                                            <a
                                                className="dropdown-item"
                                                href="/"
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Inne Gadżety
                                            </a>
                                        </div>
                                    </li>
                                    <li className="nav-item mr-2">
                                        <a
                                            className="nav-link"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Powiadomienia
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Link
                                    to="/Basket"
                                    className="d-flex order-first order-lg-first"
                                >
                                    <FontAwesomeIcon
                                        icon={faShoppingBasket}
                                        size="2x"
                                        color="#a0a3a6"
                                    />
                                    <span className="badge">
                                        {totalQuantity}
                                    </span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        </div>
    );
};

export default NavMenu;
