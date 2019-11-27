import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector } from "react-redux";

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
                    return (
                        <li
                            className="row nav-item collection-item border d-flex"
                            key={order.product.id}
                        >
                            <div className="col-md-4 d-flex align-items-center text-center">
                                <div className="item-img p-1">
                                    {/* <img
                                        src={item.img}
                                        alt="item"
                                        className="item-summary-img w-25 p-2"
                                    /> */}
                                </div>
                            </div>

                            <div className="col-md-8 border-left desc-col d-flex align-items-center">
                                <div
                                    className="item-desc mt-2"
                                    style={{ minHeight: "70px" }}
                                >
                                    <h4 className="title text-uppercase">
                                        {order.product.description1}
                                    </h4>
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
                                                    <b>Ilość: </b>
                                                    <b className="order-text-value">
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
            <div>
                <button
                    className="card order-button border-secondary btn-outline-primary m-1"
                    onClick={() => orderDetailHandler(i)}
                >
                    Zamówienie z dnia: {order.orderDate}
                </button>
            </div>
        ));
    }

    return (
        <div className="order-history" style={{ paddingTop: "100px" }}>
            <div class="container">
                <NavMenu />
                <div className="row">
                    <div className="col-6">
                        <p className="order-list ml-1">
                            Lista Twoich zamówień:
                        </p>
                        {confirmedOrder}
                    </div>
                    <div className="col-6">{clickedOrder}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
