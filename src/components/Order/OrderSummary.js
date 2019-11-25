import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addOrderData } from "../../actions/index";
import "../../assets/styles/order-summary.scss";

const OrderSummary = () => {
    const items = useSelector(state => state.cartReducer.addedItems);
    const total = useSelector(state => state.cartReducer.total);
    const orderSelectInputValue = useSelector(
        state => state.cartReducer.orderSelectInputValue
    );
    const orderInputState = useSelector(
        state => state.cartReducer.orderInputState
    );
    const orderData = useSelector(state => state.orderReducer.orderData);
    //const checkboxStatus = useSelector(state => state.checkedItems);
    const [checkBoxText] = useState("Budżet maretingowy");

    const dispatch = useDispatch();

    const orderDataHandler = () => {
        const order = {
            orderDate: new Date().toISOString().split("T")[0],
            orderNumber: orderInputState,
            orderTotal: total,
            orderPlace: orderSelectInputValue,
            orderProducts: items,
        };
        dispatch(addOrderData(order));
        return orderData;
    };

    // useEffect(() => {
    //     checkboxStatus.forEach((value, key) => {
    //
    //         if (key === "Budżet marketingowy" && value === true) {
    //             return setCheckBoxText("Budżet marketingowy");
    //         }
    //         if (key === "Budżet marketingowy" && value === false) {
    //             return setCheckBoxText("");
    //         }
    //         if (key === "Płatne" && value === true) {
    //             return setCheckBoxText("Płatne");
    //         }
    //         if (key === "Płatne" && value === false) {
    //             return setCheckBoxText("");
    //         } else {
    //             return setCheckBoxText("");
    //         }
    //     });
    // }, []);

    let addedItems = items.length ? (
        items.map(item => {
            return (
                <li
                    className="row nav-item collection-item border d-flex"
                    key={item.product.id}
                >
                    <div className="col-md-4 d-flex align-items-center text-center">
                        <div className="item-img p-1">
                            <img
                                src={item.img}
                                alt="item"
                                className="item-summary-img w-25 p-2"
                            />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col d-flex align-items-center">
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
                                                {item.price} zł
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
                                                {item.itemTotalPrice} zł
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
                <h2>Podsumowanie Twojego zamówienia</h2>
                <hr />
                <p className="order-summary-text font-weight-bold">
                    1. Zamówiłeś następujące produkty
                </p>
                <div className="m-2">{addedItems}</div>
                <p className="order-summary-text mt-2">
                    2. Kwota do zapłaty:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {total} zł
                    </span>
                </p>
                <p className="order-summary-text">
                    3. Adres dostawy:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderSelectInputValue}
                    </span>
                </p>
                <p className="order-summary-text">
                    4. Numer zamówienia Klienta:{" "}
                    <span className="summary-text-value font-weight-bold text-uppercase">
                        {orderInputState}
                    </span>
                </p>
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
                        className="btn btn-outline-primary mr-1 mt-4"
                    >
                        Wróć do koszyka
                    </Link>
                    <Link
                        to="/OrderEnd"
                        className="btn btn-outline-primary mt-4"
                        onClick={orderDataHandler}
                    >
                        Zatwierdź zamówienie
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
