import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import logo from "../../../assets/images/logo_benefit.png";

const ProductDetailsNavMenu = () => {
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);

    return (
        <div className="nav-menu fixed-top w-100">
            <div className="container-fluid border-bottom border-primary">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-6 col-sm-6 col-md-5 col-lg-3">
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
                    <div className="col-6 col-sm-6 col-md-7 col-lg-7">
                        <nav className="navbar navbar-expand-lg navbar-light">
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
                                className="collapse navbar-collapse text-right p-2 order-last order-lg-first"
                                id="navbarNavDropdown"
                            >
                                <ul className="navbar-nav ml-auto d-flex align-items-center">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            Wróć do Produktów
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                to="/Basket"
                                className="d-flex order-first order-lg-first"
                            >
                                <FontAwesomeIcon
                                    icon={faShoppingBasket}
                                    size="2x"
                                    color="#a0a3a6"
                                />
                                <span className="badge">{totalQuantity}</span>
                            </Link>
                        </nav>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsNavMenu;
