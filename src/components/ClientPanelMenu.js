import React, { useEffect, useState } from "react";

import "../assets/styles/client-panel-menu.scss";

import { useSelector } from "react-redux";

const ClientPanelMenu = () => {
    const priceValue = useSelector(state => state.total);
    const budget = useSelector(state => state.budget);
    const [budgetAlert, setBudgetAlert] = useState("");

    useEffect(() => {
        if (budget < 0) {
            setBudgetAlert(
                <div>
                    Przekroczyłeś budżet marketingowy. Jeśli chcesz zamówić
                    większą ilość produktów złóż najpierw zamówienie
                    standardowe, a dodatkowe produkty zamów osobnym zamówieniem
                    płatnym.
                </div>,
            );
        } else setBudgetAlert("");
    }, [budget]);

    return (
        <div className="client-panel border border-primary mt-3">
            <div className="admin-panel__logged-panel">
                <h4 className="logged-panel-header">Witaj</h4>
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
                            role="button"
                        >
                            Wyloguj >
                        </a>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="logged-panel__purchase-value">
                    <p className="purchase-text">
                        <span className="available-budget">
                            Dostępny budżet marketingowy
                        </span>
                        <br />
                        <span className="value">{budget},00 zł</span>
                        <span className="budget-alert">{budgetAlert}</span>
                        <br />
                        <span className="purchase-header">
                            Wartość twoich zakupów
                        </span>
                        <br />
                        <span className="value">{priceValue},00 zł</span>
                    </p>
                </div>
                <div className="divider"></div>
            </div>
        </div>
    );
};

export default ClientPanelMenu;
