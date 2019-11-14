import React from "react";
import logo from "../../assets/images/filtron_logo.png";
import { Link } from "react-router-dom";
import { signOut } from "../../actions/authorization";
import { useDispatch } from "react-redux";

const NavMenu = () => {
    const dispatch = useDispatch();

    const onSignout = () => {
        dispatch(signOut());
    };

    return (
        <div className="nav-menu fixed-top w-100">
            <div className="container-fluid border-bottom p-0">
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
                                    Kategorie
                                </a>
                                <div
                                    className="dropdown-menu text-uppercase"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <a
                                        className="dropdown-item text-uppercase"
                                        href="/"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Ubrania
                                    </a>
                                    <a
                                        className="dropdown-item text-uppercase"
                                        href="/"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Akcesoria
                                    </a>
                                    <div className="dropdown-divider"></div>
                                    <a
                                        className="dropdown-item text-uppercase"
                                        href="/"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Wszystkie
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {window.location.pathname === `/Order` ||
                            window.location.pathname === `/Basket` ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-uppercase"
                                        to="/"
                                    >
                                        Wróć do strony głównej{" "}
                                    </Link>
                                </li>
                            ) : null}
                            <li className="nav-item text-uppercase">
                                <a
                                    className="nav-link"
                                    href="/"
                                    onClick={e => e.preventDefault()}
                                >
                                    Edycja konta
                                </a>
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

export default NavMenu;
