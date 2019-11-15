import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/filtron_logo.png";

const NavMenu = () => {
    return (
        <div
            className="nav-menu fixed-top w-100"
            style={{ backgroundColor: "#FFF" }}
        >
            <div className="container-fluid border-bottom">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-sm-6 col-md-5 col-lg-3">
                        <div className="logo-div p-3">
                            <Link to="/">
                                <img
                                    src={logo}
                                    className="logo-media"
                                    alt="logo"
                                    wdith="190"
                                    height="35"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-7 col-lg-7 d-flex">
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
                                <ul className="navbar-nav text-right w-100 d-flex justify-content-around">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link text-uppercase"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Strona główna
                                        </a>
                                    </li>
                                    <li className="nav-item text-uppercase">
                                        <a
                                            className="nav-link"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Nagrody
                                        </a>
                                    </li>
                                    <li className="nav-item text-uppercase">
                                        <a
                                            className="nav-link"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Zasady
                                        </a>
                                    </li>
                                    <li className="nav-item text-uppercase">
                                        <a
                                            className="nav-link"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Faq
                                        </a>
                                    </li>
                                    <li className="nav-item mr-0 text-uppercase">
                                        <a
                                            className="nav-link"
                                            href="/"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Kontakt
                                        </a>
                                    </li>
                                </ul>
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
