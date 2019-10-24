import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/styles/order-summary.scss";

const OrderSummary = () => {
    const items = useSelector(state => state.addedItems);
    const total = useSelector(state => state.total);

    const dispatch = useDispatch();

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

                    <div className="col-md-8 border-left desc-col">
                        <div className="item-desc">
                            <h4 className="title text-uppercase">
                                {item.title}
                            </h4>
                            <p>
                                <b>
                                    Cena:{" "}
                                    <span className="order-text-value">
                                        {item.price},00 zł
                                    </span>
                                </b>
                            </p>
                            <div className="add-remove">
                                <span className="mr-3 mb-3">
                                    <b>Ilość: {item.quantity}</b>
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
                <span className="summary-text-value">{total},00 zł</span>
            </p>
            <p className="order-summary-text font-weight-bold">
                3. Adres dostawy:
            </p>
            <p className="order-summary-text font-weight-bold">
                4. Numer zamówienia Klienta:
            </p>
            <p className="order-summary-text font-weight-bold">
                5. Typ zamówienia:
            </p>
            <hr />
            <Link to="/OrderEnd" className="btn btn-outline-primary mt-4">
                Zatwierdź zamówienie
            </Link>
            <br />
            <Link to="/Basket" className="btn btn-outline-primary mt-4">
                Wróć do koszyka
            </Link>
        </div>
    );
};

export default OrderSummary;
