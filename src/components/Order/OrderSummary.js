import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, productsToOrder } from "../../actions/index";
import { useTranslation } from "react-i18next";
import "../../assets/styles/order-summary.scss";
import Separator from "../Separator/Separator";
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

    const budget = useSelector(
        state =>
            state.clientDataReducer.clientData.getWixClientData.budget
                .remainingBudget,
    );
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const updatedBudget = useSelector(state => state.cartReducer.budget);

    const budgetOrder = true;
    const orderIsFirst = true;

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const token = localStorage.getItem("token");

    if (products && productsOrdered.length === 0) {
        products.map(item => {
            const basketProducts = {
                prodId: item.product.id,
                uomPrimary: item.product.unitOfMeasure,
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
                        <span className="summary-product-name text-uppercase">
                            {item.product.name}
                        </span>
                    </td>
                    <td>
                        {Separator(item.price.price)} {item.price.currency}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                        {Separator(item.itemTotalPrice)} {item.price.currency}
                    </td>
                </tr>
            );
        })
    ) : (
        <p>{t("Basket.BasketIsEmpty")}</p>
    );

    return (
        <div className="order-summary">
            <div className="container">
                <h2 className="title-header">{t("Order.OrderSummary")}</h2>
                <hr />
                <ol>
                    {budgetOrder && orderIsFirst && orderType === "S5" ? (
                        <li className="order-summary-text">
                            {t("Order.TheValueOfYourBudget")}:
                            <span className="summary-text-value font-weight-bold text-uppercase ml-1">
                                {Separator(budget)} {items[0].price.currency}
                            </span>
                        </li>
                    ) : (
                        <li className="order-summary-text">
                            {t("Order.OrderType")}:
                            <span className="summary-text-value font-weight-bold text-uppercase ml-1">
                                {t("Order.ZamówieniaPłatne")}
                            </span>
                        </li>
                    )}
                    {budgetOrder && !orderIsFirst ? (
                        <li className="order-summary-text">
                            {t("Order.ValueOfAvailableBudget")}:{" "}
                        </li>
                    ) : (
                        <></>
                    )}
                    <li className="order-summary-text">
                        {t("Order.OrderedProducts")}:
                    </li>
                </ol>
                <table className="summary-table">
                    <thead>
                        <tr className="summary-header">
                            <th>{t("Order.ProductName")}</th>
                            <th>{t("Card.Price")}</th>
                            <th>{t("Basket.Qauntity")}</th>
                            <th>{t("Basket.Sum")}</th>
                        </tr>
                    </thead>
                    <tbody>{addedItems}</tbody>
                </table>
                <ol start={budgetOrder ? 3 : 2}>
                    <li className="order-summary-text">
                        {budgetOrder
                            ? `${t("Order.OrderValue")}: `
                            : `${t("Basket.AmountToPay")}`}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {Separator(total)} {items[0].price.currency}
                        </span>
                    </li>
                    {budgetOrder ? (
                        <li className="order-summary-text">
                            {t("Order.RemainingToUse")}:
                            <span className="summary-text-value font-weight-bold text-uppercase ml-1">
                                {Separator(updatedBudget)}{" "}
                                {items[0].price.currency}
                            </span>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li className="order-summary-text">
                        {t("Order.DeliveryAddress")}:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {orderSelectInputValue}
                        </span>
                    </li>
                    <li className="order-summary-text">
                        {t("Order.OrderType")}:{" "}
                        <span className="summary-text-value font-weight-bold text-uppercase">
                            {orderType === "S5"
                                ? `${t("Order.MarketingBudget")}`
                                : `${t("Order.PaidOrder")}`}
                        </span>
                    </li>
                </ol>
                <hr />
                <div className="d-flex flex-wrap justify-content-between">
                    <Link
                        to="/Basket"
                        className="btn btn-outline-primary btn-back border-button"
                    >
                        {t("Order.RETURNTOBASKET")}
                    </Link>
                    <Link
                        to="/OrderEnd"
                        className="btn btn-outline-primary btn-submit border-button"
                        onClick={() => dispatch(createOrder(token))}
                    >
                        {t("Order.CONFIRMTHEORDER")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
