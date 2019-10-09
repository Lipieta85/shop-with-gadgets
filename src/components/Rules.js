import React from "react";

import "../assets/styles/rules.scss";

import icon1 from "../assets/images/icons/rules_ico_1.png";
import icon2 from "../assets/images/icons/rules_ico_2.png";
import icon3 from "../assets/images/icons/rules_ico_3.png";

const Rules = () => {
    return (
        <div className="container-fluid pt-5 pb-5">
            <h1 className="container-header mb-5">
                CZYTELNE ZASADY!
            </h1>
            <div className="rules">
                <div className="rule">
                    <div className="rule-header d-flex">
                        <div className="rule-icon">
                            <img src={icon1} alt="icon1" />
                        </div>
                        <div className="ml-4 mt-2">
                            <p className="rule-header-text"><strong>Rejestrujesz się</strong><br />w programie</p>
                        </div>
                    </div>
                    <div className="rule-content">
                        <p className="rule-content-text">Podczas rejestracji wybierz swoich dostawców filtrów FILTRON i/lub WIX Filtres. To oni będą nam przekazywać wartości Twoich zamowień</p>
                    </div>
                </div>

                <div className="rule">
                    <div className="rule-header d-flex">
                        <div className="rule-icon">
                            <img src={icon2} alt="icon1" />
                        </div>
                        <div className="ml-4 mt-2">
                            <p className="rule-header-text"><strong>Rejestrujesz się</strong><br />w programie</p>
                        </div>
                    </div>
                    <div className="rule-content">
                        <p className="rule-content-text">Podczas rejestracji wybierz swoich dostawców filtrów FILTRON i/lub WIX Filtres. To oni będą nam przekazywać wartości Twoich zamowień</p>
                    </div>
                </div>

                <div className="rule">
                    <div className="rule-header d-flex">
                        <div className="rule-icon">
                            <img src={icon3} alt="icon1" />
                        </div>
                        <div className="ml-4 mt-2">
                            <p className="rule-header-text"><strong>Rejestrujesz się</strong><br />w programie</p>
                        </div>
                    </div>
                    <div className="rule-content">
                        <p className="rule-content-text">Podczas rejestracji wybierz swoich dostawców filtrów FILTRON i/lub WIX Filtres. To oni będą nam przekazywać wartości Twoich zamowień</p>
                    </div>
                </div>

            </div>
            <div className="rules-button">
                <button className="btn btn-default wide-auto" type="button">Dowiedz się więcej o zasadach</button>
            </div>
        </div>
    )
}

export default Rules;