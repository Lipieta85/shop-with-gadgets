import React, { useState, useEffect } from 'react';
import '../../assets/styles/nav-menu.scss';
import logo from "../../assets/images/logo_benefit.png";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAuth } from "../../authentication/Auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

const NavMenu = () => {
    const totalQuantity = useSelector(state => state.totalQuantity);

    const { setAuthTokens } = useAuth();

    const logOut = () => {
        setAuthTokens();
    }

    return (
        <div className="nav-menu fixed-top w-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-6 col-sm-6 col-md-5 col-lg-3">
                        <div className="logo-div p-3">
                            <Link to="/"><img src={logo} className="logo-media" alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="col-6 col-sm-6 col-md-7 col-lg-7">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <a className="navbar-brand" href="#"></a>
                            <button className="navbar-toggler mt-2" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse text-right p-2" id="navbarNavDropdown">
                                <ul className="navbar-nav ml-auto d-flex align-items-center">
                                    <li>
                                        <Link to="/client">Wróć do Produktów</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Kategorie</a>
                                    </li>
                                    <li className="nav-item mr-2">
                                        <a className="nav-link" href="#">Powiadomienia</a>
                                    </li>
                                </ul>
                            </div>
                            {/* <li className="nav-item">
                                <a className="nav-link" href={"/Basket"}>Koszyk</a>
                            </li> */}

                            <Link to="/Basket" className="d-flex"><FontAwesomeIcon icon={faShoppingBasket} size="2x" color="#a0a3a6" /><span className="badge">{totalQuantity}</span></Link>
                        </nav>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        </div>
    )
}

export default NavMenu;