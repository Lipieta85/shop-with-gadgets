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
    const addedItems = useSelector(state => state.cartReducer.addedItems);
    const orderHistory = useSelector(state => state.orderReducer.historyOfBuy);
    const orderHistoryShow = useSelector(
        state => state.orderReducer.historyShow,
    );
    const [orderList, setOrderList] = useState();

    const [budgetAlert, setBudgetAlert] = useState("");
    let currency = [];
    if (addedItems) {
        addedItems.map(item => {
            return (currency = item.price.currency);
        });
    }

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

    useEffect(() => {
        if (orderHistoryShow) {
            setOrderList(
                orderHistory.map(order => {
                    return <p>{order.orderDate}</p>;
                }),
            );
        }
    }, [orderHistoryShow, orderHistory]);

    const buttonHandler = e => {
        if (addedItems.length === 0) {
            e.preventDefault();
            //alert("Koszyk jest pusty, dodaj produkt");
        }
    };

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
                            <span className="badge badge-blue">
                                {totalQuantity}
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center">
                            <Link
                                to="/Basket"
                                className="no-deco basket-box"
                                onClick={buttonHandler}
                            >
                                <FontAwesomeIcon
                                    icon={faShoppingBasket}
                                    size="2x"
                                    className="basket"
                                />
                                {totalQuantity === 0 ? (
                                    <>
                                        <span className="basket-counter counter-gray">
                                            {totalQuantity}
                                        </span>
                                        <span className="basket-title">
                                            Koszyk (pusty)
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="basket-counter counter-blue">
                                            {totalQuantity}
                                        </span>
                                        <span className="basket-title">
                                            Twój koszyk
                                        </span>
                                    </>
                                )}
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
                        <span className="blue-value">{budget} </span>
                        <span className="value">{currency}</span>
                        <span className="budget-alert">{budgetAlert}</span>
                        <br />
                        <div className="y-rem-18"></div>
                        <span className="purchase-header">
                            Wartość twoich zakupów
                        </span>
                        <br />
                        <span className="blue-value">{priceValue} </span>
                        <span className="value">{currency}</span>
                    </div>
                </div>
                <div className="divider"></div>
                <div>{orderList}</div>
            </div>
        </div>
    );
};

export default ClientPanelMenu;
