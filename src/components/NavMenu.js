import React from 'react';
import '../assets/styles/nav-menu.scss';
import logo from "../assets/images/logo_benefit.png"

const NavMenu = () => {
    return (
        <div className="nav-menu fixed-top w-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-6 col-sm-6 col-md-5 col-lg-3">
                        <div className="logo-div p-3">
                            <img src={logo} className="logo-media" alt="logo" />
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-7 col-lg-7">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="navbar-brand" href="#"></a>
                            <button className="navbar-toggler mt-2" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse text-right p-2" id="navbarNavDropdown">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Strona główna</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Nagrody</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Zasady</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Faq</a>
                                    </li>
                                    <li className="nav-item mr-0">
                                        <a className="nav-link" href="/">Kontakt</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        </div>
    )
}

export default NavMenu;