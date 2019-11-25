import React from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector } from "react-redux";

import "../../assets/styles/order-history.scss";

const OrderHistory = () => {
    const orders = useSelector(state => state.orderReducer.historyOfBuy);

    let confirmedOrder;

    const orderDetailHandler = () => {};

    if (orders) {
        confirmedOrder = orders.map(order => (
            <div className="card border-secondary m-1 col-sm-6 col-lg-4">
                <span onClick={orderDetailHandler}>
                    Zamówienie z dnia: {order.orderDate}
                </span>
            </div>
        ));
    }

    return (
        <div className="order-history" style={{ paddingTop: "100px" }}>
            <div class="container">
                <NavMenu />
                <p>Lista Twoich zamówień:</p>
                {confirmedOrder}
            </div>
        </div>
    );
};

export default OrderHistory;
