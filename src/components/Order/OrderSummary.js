import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, productsToOrder } from "../../actions/index";
import "../../assets/styles/order-summary.scss";
import defImg from "../../assets/images/default.jpg";

const OrderSummary = () => {
    const products = useSelector(state => state.cartReducer.addedItems);
    const total = useSelector(state => state.cartReducer.total);
    const orderSelectInputValue = useSelector(
        state => state.cartReducer.orderSelectInputValue,
    );
    const [checkBoxText] = useState("Budżet maretingowy");

    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

    let items = [];

    if (products) {
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
                <li
                    className="row nav-item collection-item d-flex"
                    key={item.product.id}
                >
                    <div className="col-sm-4 d-flex align-items-center text-center">
                        <div className="item-img p-1">
                            <img
                                src={
                                    item.images.length
                                        ? item.images[0].small
                                        : defImg
                                }
                                alt="item"
                                className="item-summary-img w-50 p-2"
                            />
                        </div>
                    </div>

                    <div className="col-sm-8 desc-col summary-item-info d-flex align-items-center mb-1">
                        <div
                            className="item-desc mt-2"
                            style={{ minHeight: "70px" }}
                        >
                            <h4 className="title text-uppercase">
                                {item.product.description1}
                            </h4>
                            <div>
                                <div className="d-flex flex-wrap justify-content-between">
                                    <div>
                                        <b>
                                            Cena:{" "}
                                            <span className="order-text-value">
                                                {item.price.price}{" "}
                                                {item.price.currency}
                                            </span>
                                        </b>
                                    </div>
                                    <div className="add-remove">
                                        <span className="mx-3 mb-4">
                                            <b>Ilość: </b>
                                            <b className="order-text-value">
                                                {item.quantity}
                                            </b>
                                        </span>
                                    </div>
                                    <div className="add-remove">
                                        <span className="mr-3 mb-3">
                                            <b>Razem: </b>
                                            <b className="order-text-value">
                                                {item.itemTotalPrice}{" "}
                                                {item.price.currency}
                                            </b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            );
        })
    ) : (
        <p>Twój koszyk jest pusty</p>
    );

    return (
        <div className="order-summary">
            <div className="container">
                <h2>Podsumowanie zamówienia</h2>
                <hr />
                <p className="order-summary-text">1. Zamówione produkty:</p>
                <div className="m-2">{addedItems}</div>
                <p className="order-summary-text mt-4">
                    2. Kwota do zapłaty:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {total} {products[0].price.currency}
                    </span>
                </p>
                <p className="order-summary-text">
                    3. Adres dostawy:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderSelectInputValue}
                    </span>
                </p>
                {/* <p className="order-summary-text">
                    4. Numer zamówienia Klienta:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderInputState}
                    </span>
                </p> */}
                <p className="order-summary-text">
                    5. Typ zamówienia:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {checkBoxText}
                    </span>
                </p>
                <hr />
                <div className="d-flex flex-wrap justify-content-between">
                    <Link
                        to="/Basket"
                        className="btn btn-outline-primary btn-back"
                    >
                        Wróć do koszyka
                    </Link>
                    <Link
                        to="/OrderEnd"
                        className="btn btn-outline-primary btn-submit"
                        onClick={() => dispatch(createOrder(token, items))}
                    >
                        Zatwierdź zamówienie
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
