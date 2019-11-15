import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import "../assets/styles/client-panel-menu.scss";

const ClientPanelMenu = () => {
    const priceValue = useSelector(state => state.cartReducer.total);
    const budget = useSelector(state => state.cartReducer.budget);
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);

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
        <div className="client-panel">
            <div className="admin-panel__logged-panel">
                <h4 className="logged-panel-header">Witaj</h4>
                <div className="logged-panel-btn-group">
                    {window.location.pathname === "/Basket" ? (
                        <div className="d-flex">
                            <FontAwesomeIcon
                                icon={faShoppingBasket}
                                size="2x"
                                color="#a0a3a6"
                            />
                            <span className="badge">{totalQuantity}</span>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Link
                                to="/Basket"
                                className="btn btn-outline-primary"
                            >
                                Przejdź do koszyka({totalQuantity})
                            </Link>
                        </div>
                    )}
                </div>
                <div className="divider"></div>
                <div className="logged-panel__purchase-value">
                    <div className="purchase-text">
                        <span className="available-budget">
                            Dostępny budżet marketingowy
                        </span>
                        <br />
                        <span className="value">{budget} zł</span>
                        <span className="budget-alert">{budgetAlert}</span>
                        <br />
                        <span className="purchase-header">
                            Wartość twoich zakupów
                        </span>
                        <br />
                        <span className="value">{priceValue} zł</span>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        </div>
    );
};

export default ClientPanelMenu;
