import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector } from "react-redux";
import defImg from "../../assets/images/default.jpg";

import "../../assets/styles/order-history.scss";

const OrderHistory = () => {
    const orders = useSelector(state => state.orderReducer.historyOfBuy);
    const [clickedOrder, setClickedOrder] = useState();

    let confirmedOrder;
    let selectedOrderView;

    const orderDetailHandler = selectedOrder => {
        orders.map((order, i) => {
            if (i === selectedOrder) {
                selectedOrderView = order.orderProducts.map(order => {
                    console.log(order);
                    return (
                        <li
                            className="row nav-item collection-item border d-flex"
                            key={order.product.id}
                        >
                            <div className="col-md-4 d-flex align-items-center text-center">
                                <div className="item-img p-1">
                                    <img
                                        src={order.img ? order.img : defImg}
                                        alt="item"
                                        className="item-summary-img w-50 p-2"
                                    />
                                </div>
                            </div>

                            <div className="col-md-8 border-left desc-col d-flex align-items-center">
                                <div
                                    className="item-desc mt-2"
                                    style={{ minHeight: "70px" }}
                                >
                                    <div className="d-flex">
                                        <h4 className="title text-uppercase">
                                            {order.product.description1}
                                        </h4>
                                        <p className="ml-3">
                                            ({order.product.second_item_number})
                                        </p>
                                    </div>
                                    <div>
                                        <div className="d-flex flex-wrap justify-content-between">
                                            <div>
                                                <b>
                                                    Cena:{" "}
                                                    <span className="order-text-value">
                                                        {order.price} zł
                                                    </span>
                                                </b>
                                            </div>
                                            <div className="add-remove">
                                                <span className="mx-3 mb-4">
                                                    <b className="mr-1">
                                                        Ilość
                                                        zamówiona/dostarczona:
                                                    </b>
                                                    <b className="order-text-value">
                                                        {order.quantity} /{" "}
                                                        {order.quantity}
                                                    </b>
                                                </span>
                                            </div>
                                            <div className="add-remove">
                                                <span className="mr-3 mb-3">
                                                    <b>Razem: </b>
                                                    <b className="order-text-value">
                                                        {order.itemTotalPrice}{" "}
                                                        zł
                                                    </b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                });
            }
            return setClickedOrder(selectedOrderView);
        });
    };

    if (orders) {
        confirmedOrder = orders.map((order, i) => (
            <button
                className="order-button border-secondary btn mb-1"
                onClick={() => orderDetailHandler(i)}
            >
                Zamówienie z dnia: {order.orderDate}
                <br />
                Miejsce dostawy: {order.orderPlace}
                <br />
                <div className="d-flex justify-content-between">
                    <span>Wartość netto: {order.orderTotal} zł</span>
                    <br />
                    <span>Status: Dostarczona</span>
                </div>
            </button>
        ));
    }

    return (
        <div className="order-history">
            <div className="container-fluid p-5">
                <NavMenu />
                <div className="row">
                    <div className="col-12">
                        <h4 className="order-list ml-1">
                            Lista Twoich zamówień:
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-4 order-container">
                        {confirmedOrder}
                    </div>
                    <div className="col-sm-12 col-md-8">{clickedOrder}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
