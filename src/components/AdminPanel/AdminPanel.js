import React from "react";
//import SingleSlider from "./SingleSlider";
import { useAuth } from "../../authentication/Auth";
import Products from "./Products";

import "../../assets/styles/admin-panel.scss";

//import image300 from "../../assets/images/Filtron_300pkt.jpg";

const AdminPanel = () => {
    const { setAuthTokens } = useAuth();

    const logOut = () => {
        setAuthTokens();
    };

    return (
        <div className="admin-panel">
            <div className="container-fluid">
                <div className="row">
                    <Products />
                    {/* <div className="col-xl-1"></div>
                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-7">
                        <div className="admin-panel__left-column">
                            <SingleSlider />
                            <div className="divider-white"></div>
                            <div className="left-column__news-container">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5">
                                        <img className="news-img" src={image300} alt="image300" />
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7">
                                        <div className="news">
                                            <h3 className="news-header">Dla wtajemniczonych</h3>
                                            <p className="news-text">Potrafisz poznać potrzeby klienta i doradzić najlepsze rozwiązanie? Właśnie teraz o tym przekonasz się w praktyce, bo nadeszła nasza finałowa aktywność - tylko DLA WTAJEMNICZONYCH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-3">
                        <div className="admin-panel__logged-panel">
                            <h4 className="logged-panel-header">
                                Witaj filtron-test
                            </h4>
                            <p className="logged-panel-text">
                                Reprezentujesz firmę:
                                <br />
                                <span>FILTRON - TEST</span>
                            </p>
                            <div className="logged-panel-btn-group">
                                <div className="btn-left">
                                    <a
                                        href="/"
                                        className="btn btn-outline-primary left-btn"
                                        role="button"
                                        onClick={e => e.preventDefault()}
                                    >
                                        Edycja konta >
                                    </a>
                                </div>
                                <div className="btn-right">
                                    <a
                                        href="/"
                                        className="btn btn-outline-primary right-btn"
                                        onClick={logOut}
                                        role="button"
                                    >
                                        Wyloguj >
                                    </a>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="logged-panel__purchase-value">
                                <p className="purchase-text">
                                    <span className="purchase-header">
                                        Wartość twoich zakupów
                                    </span>
                                    <br />
                                    <span className="value">0,00 zł</span>
                                    <br />
                                    <span className="purchase-header">
                                        Premia za wzrost zakupowy
                                    </span>
                                    <br />
                                    <span className="value">0,00 zł</span>
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="logged-panel__activity">
                                <p>
                                    Liczba aktywności specjlanych z Twoim
                                    udziałem: 1
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="logged-panel__distributors">
                                <p className="distributors-text">
                                    Zaimportowano dane od <span>30</span> z{" "}
                                    <span>30</span> dystrybutorów
                                </p>
                                <a
                                    href="/"
                                    className="btn btn-outline-primary distributors-btn"
                                    role="button"
                                    onClick={e => e.preventDefault()}
                                >
                                    Status importu >
                                </a>
                            </div>
                            <div className="logged-panel__status">
                                <p>
                                    <span>Twój status: </span>
                                    <br />
                                    Masz jeszcze czas, by przekroczyć minimalny
                                    próg zakupowy wysokości 500 zł i swoją
                                    przygodę w FILTRON BENEFIT PROGRAM 2019
                                    zamienić na prawdziwe nagrody! Nie zwlekaj -
                                    trzymamy kciuki i życzymy powodzenia!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-1"></div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
