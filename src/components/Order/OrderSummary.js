import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/styles/order-summary.scss";

const OrderSummary = () => {
    const items = useSelector(state => state.addedItems);
    const total = useSelector(state => state.total);
    const orderSelectInputValue = useSelector(
        state => state.orderSelectInputValue,
    );
    const orderInputState = useSelector(state => state.orderInputState);
    //const checkboxStatus = useSelector(state => state.checkedItems);
    const [checkBoxText] = useState("Budżet maretingowy");

    // useEffect(() => {
    //     checkboxStatus.forEach((value, key) => {
    //         console.log(value, key);
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
                    key={item.id}
                >
                    <div className="col-md-4 d-flex align-items-center text-center">
                        <div className="item-img">
                            <img
                                src={item.img}
                                alt="item"
                                className="w-50 p-2"
                            />
                        </div>
                    </div>

                    <div className="col-md-8 border-left desc-col d-flex align-items-center">
                        <div className="item-desc">
                            <h4 className="title text-uppercase">
                                {item.title}
                            </h4>
                            <p>
                                <b>
                                    Cena:{" "}
                                    <span className="order-text-value">
                                        {item.price} zł
                                    </span>
                                </b>
                            </p>
                            <div className="add-remove">
                                <span className="mr-3 mb-4">
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
                </li>
            );
        })
    ) : (
        <p>Twój koszyk jest pusty</p>
    );

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <h2>Podsumowanie Twojego zamówienia</h2>
            <hr />
            <p className="order-summary-text font-weight-bold">
                1. Zamówiłeś następujące produkty
            </p>
            {addedItems}
            <p className="order-summary-text font-weight-bold mt-2">
                2. Kwota do zapłaty:{" "}
                <span className="summary-text-value">{total} zł</span>
            </p>
            <p className="order-summary-text font-weight-bold">
                3. Adres dostawy:{" "}
                <span className="summary-text-value">
                    {orderSelectInputValue}
                </span>
            </p>
            <p className="order-summary-text font-weight-bold">
                4. Numer zamówienia Klienta:{" "}
                <span className="summary-text-value">{orderInputState}</span>
            </p>
            <p className="order-summary-text font-weight-bold">
                5. Typ zamówienia:{" "}
                <span className="summary-text-value">{checkBoxText}</span>
            </p>
            <hr />
            <div className="d-flex justify-content-between">
                <Link to="/Basket" className="btn btn-outline-primary mt-4">
                    Wróć do koszyka
                </Link>
                <Link to="/OrderEnd" className="btn btn-outline-primary mt-4">
                    Zatwierdź zamówienie
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
