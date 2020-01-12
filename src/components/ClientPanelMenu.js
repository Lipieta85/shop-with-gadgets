import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import "../assets/styles/client-panel-menu.scss";

const ClientPanelMenu = () => {
    const priceValue = useSelector(state => state.cartReducer.total);
    const budget = useSelector(state => state.cartReducer.budget);
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);
    const addedItems = useSelector(state => state.cartReducer.addedItems);
    const orderHistory = useSelector(state => state.orderReducer.historyOfBuy);
    const companyName = useSelector(state => state.clientDataReducer.companyName);
    const userName = useSelector(state => state.clientDataReducer.userName);
    const currencyCode = useSelector(state => state.clientDataReducer.currencyCode);
    const orderHistoryShow = useSelector(
        state => state.orderReducer.historyShow,
    );
    const [orderList, setOrderList] = useState();

    const [budgetAlert, setBudgetAlert] = useState("");
    const { t } = useTranslation();

    let currency = [];

    if (addedItems) {
        addedItems.map(item => {
            return currency.push(item.price.currency);
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
                <div className="logged-panel-header">
                    <div>{t(`CPanelMenu.Zalogowany`)}: {userName} ({companyName})</div>
                </div>
                <div className="logged-panel-btn-group">
                    {window.location.pathname === "/Basket" ? (
                        <Link
                            to="/Basket"
                            className="no-deco basket-box"
                            onClick={buttonHandler}
                        >
                            <div className="d-flex">
                                <FontAwesomeIcon
                                    icon={faShoppingBasket}
                                    size="2x"
                                    color="#a0a3a6"
                                    className="icon-anim"
                                />
                                <span className="badge badge-blue">
                                    {totalQuantity}
                                </span>
                                <span>{t(`CPanelMenu.TwójKoszyk`)}</span>
                            </div>
                        </Link>
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
                                    className="basket icon-anim"
                                />
                                {totalQuantity === 0 ? (
                                    <>
                                        <span className="basket-counter counter-gray">
                                            {totalQuantity}
                                        </span>
                                        <span className="basket-title">
                                            {t(`CPanelMenu.Koszyk(pusty)`)}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="basket-counter counter-blue">
                                            {totalQuantity}
                                        </span>
                                        <span className="basket-title">
                                            {t(`CPanelMenu.TwójKoszyk`)}
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
                            {t(`CPanelMenu.DostępnyBudżetMarketingowy`)}
                        </span>
                        <br />
                        <span className="blue-value">
                            {budget} {budget ? currencyCode : ""}
                        </span>
                        {/* <span className="value">{currency}</span> */}
                        <span className="budget-alert">{budgetAlert}</span>
                        <br />
                        <div className="y-rem-18"></div>
                        <span className="purchase-header">
                            {t(`CPanelMenu.WartośćTwoichZakupów`)}
                        </span>
                        <br />
                        <span
                            className={
                                +priceValue > +budget
                                    ? "budget-alert-exceeded"
                                    : "blue-value"
                            }
                        >
                            {priceValue} {currencyCode}
                        </span>
                        {/* <span className="value">{currency}</span> */}
                    </div>
                </div>
                <div className="divider"></div>
                <div>{orderList}</div>
            </div>
        </div>
    );
};

export default ClientPanelMenu;
