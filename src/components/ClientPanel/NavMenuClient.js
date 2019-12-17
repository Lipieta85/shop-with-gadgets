import React from "react";
import logo from "../../assets/images/filtron_logo.png";
import "../../assets/styles/nav-menu.scss";
import { Link } from "react-router-dom";
import { signOut } from "../../actions/authorization";
import { useDispatch } from "react-redux";
import { setProductCategories } from "../../actions/index";

const NavMenu = () => {
    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

    const onSignout = () => {
        dispatch(signOut());
    };

    const oneCategoryHandler = (e) => {
        console.log(e.target.id)
        dispatch(setProductCategories(token, e.target.id))
    }

    const allProductsHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className="nav-menu fixed-top w-100 nav-shadow">
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="200" height="35" alt="" />
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
                        <ul className="navbar-nav">
                            {window.location.pathname === `/` ? (
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a
                                            id="1"
                                            className="nav-link active"
                                            href="/"
                                            onClick={allProductsHandler}
                                        >
                                            Wszystkie
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            id="30002141"
                                            className="nav-link"
                                            href="/"
                                            onClick={oneCategoryHandler}
                                        >
                                            Biuro
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            id="30002142"
                                            className="nav-link"
                                            href="/"
                                            onClick={oneCategoryHandler}
                                        >
                                            Tekstylia
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            id="30002143"
                                            className="nav-link"
                                            href="/"
                                            onClick={oneCategoryHandler}
                                        >
                                            Gadżety
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            id="30002144"
                                            className="nav-link"
                                            href="/"
                                            onClick={oneCategoryHandler}
                                        >
                                            Materiały promocyjne
                                        </a>
                                    </li>
                                </ul>
                            ) : null}
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {window.location.pathname === `/Order` ||
                            window.location.pathname === `/Basket` ||
                            window.location.pathname === `/Regulations` ||
                            window.location.pathname === `/Rodo` ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-uppercase"
                                        to="/"
                                    >
                                        Wróć do strony głównej{" "}
                                    </Link>
                                </li>
                            ) : null}
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
                                </div>
                            </li>
                            <li className="nav-item text-uppercase">
                                <a
                                    className="nav-link"
                                    onClick={onSignout}
                                    href="https://mh-ecommerce-dev.bpower2.com/index.php/site/desktop"
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

export default NavMenu;
