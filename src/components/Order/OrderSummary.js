import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, productsToOrder } from "../../actions/index";
import { useTranslation } from "react-i18next";
import "../../assets/styles/order-summary.scss";
import defImg from "../../assets/images/default.jpg";

const OrderSummary = () => {
    const items = useSelector(state => state.cartReducer.items);
    const products = useSelector(state => state.cartReducer.addedItems);
    const productsOrdered = useSelector(
        state => state.cartReducer.productsToOrder,
    );
    const total = useSelector(state => state.cartReducer.total);
    const orderSelectInputValue = useSelector(
        state => state.cartReducer.orderSelectInputValue,
    );
    const [checkBoxText] = useState("Budżet maretingowy");

    const budgetOrder = true;
    const orderIsFirst = true;

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const token = localStorage.getItem("token");

    if (products && productsOrdered.length === 0) {
        products.map(item => {
            const basketProducts = {
                prodId: item.product.id,
                uomPrimary: item.product.uom_primary,
                quantity: item.quantity,
            };
            return dispatch(productsToOrder(basketProducts));
        });
    }
    let currency = [];
    let addedItems = products.length ? (
        products.map(item => {
            currency.push(item.price.currency);
            return (
                <tr key={item.product.id} className="table-row">
                    <td>
                        <img
                            src={
                                item.images.length
                                    ? item.images[0].small
                                    : defImg
                            }
                            alt="item"
                            className="summary-img"
                        />
                        <span className="text-uppercase">
                            {item.product.description1}
                        </span>
                    </td>
                    <td>
                        {item.price.price} {item.price.currency}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                        {item.itemTotalPrice} {item.price.currency}
                    </td>
                </tr>
            );
        })
    ) : (
        <p>{t("Basket.KoszykJestPusty")}</p>
    );

    return (
        <div className="order-summary">
            <div className="container">
                <h2>{t("Order.Podsumowanie")}</h2>
                <hr />
                <ol>
                    {budgetOrder && orderIsFirst ? (
                        <li className="order-summary-text">
                            {t("Order.WartośćBudżetu")}:
                            <span className="summary-text-value font-weight-bold text-uppercase">
                                {} {items[0].price.currency}
                            </span>
                        </li>
                    ) : (
                        <></>
                    )}
                    {budgetOrder && !orderIsFirst ? (
                        <li className="order-summary-text">
                            {t("Order.WartośćDostępnegoBudżetu")}:{" "}
                        </li>
                    ) : (
                        <></>
                    )}
                    <li className="order-summary-text">
                        {t("Order.ZamówioneProdukty")}:
                    </li>
                </ol>
                <table className="summary-table">
                    <thead>
                        <tr className="summary-header">
                            <th>{t("Order.NazwaProduktu")}</th>
                            <th>{t("Card.Cena")}</th>
                            <th>{t("Basket.Ilość")}</th>
                            <th>{t("Basket.Razem")}</th>
                        </tr>
                    </thead>
                    <tbody>{addedItems}</tbody>
                </table>
                <ol start={budgetOrder ? 3 : 2}>
                    <li className="order-summary-text">
                        {budgetOrder
                            ? `${t("Order.WartośćZamówienia")}: `
                            : `${t("Basket.Kwota")}`}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {total} {items[0].price.currency}
                        </span>
                    </li>
                    {budgetOrder ? (
                        <li className="order-summary-text">
                            {t("Order.PozostałoDoWykorzystania")}:
                            <span className="summary-text-value font-weight-bold text-uppercase">
                                {} {items[0].price.currency}
                            </span>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li className="order-summary-text">
                        {t("Order.AdresDostawy")}:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {orderSelectInputValue}
                        </span>
                    </li>
                    <li className="order-summary-text">
                        {t("Order.TypZamówienia")}:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {checkBoxText}
                        </span>
                    </li>
                </ol>
                {/* <p className="order-summary-text">
                    4. Numer zamówienia Klienta:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderInputState}
                    </span>
                </p> */}
                <hr />
                <div className="d-flex flex-wrap justify-content-between">
                    <Link
                        to="/Basket"
                        className="btn btn-outline-primary btn-back"
                    >
                        {t("Order.WróćDoKoszyka")}
                    </Link>
                    <Link
                        to="/OrderEnd"
                        className="btn btn-outline-primary btn-submit"
                        onClick={() => dispatch(createOrder(token))}
                    >
                        {t("Order.Zatwierdź")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
