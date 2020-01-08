import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector, useDispatch } from "react-redux";
import {
    getClientOrdersHistory,
    getClientSingleOrdersHistory,
} from "../../actions/index";
//import defImg from "../../assets/images/default.jpg";
import { Link } from "react-router-dom";
import "../../assets/styles/order-history.scss";
import Spinner from "../UI/Spinner/Spinner";
const OrderHistory = () => {
    const orders = useSelector(state => state.orderReducer.clientOrderHistory);
    const singleOrder = useSelector(
        state => state.orderReducer.singleOrderHistory,
    );
    const [clickedOrder, setClickedOrder] = useState();
    const dispatch = useDispatch();
    let confirmedOrder;
    let selectedOrderView;
    const token = localStorage.getItem("token");
    useEffect(() => {
        dispatch(getClientOrdersHistory(token));
    }, [token, dispatch]);
    console.log(orders);
    const orderDetailHandler = selectedOrder => {
        orders.map((order, i) => {
            console.log("order", order);
            if (i === selectedOrder) {
                dispatch(getClientSingleOrdersHistory(token, order.order_id));
                if (singleOrder.length) {
                    selectedOrderView = singleOrder.map(order => {
                        return (
                            <li
                                className="row nav-item collection-item border d-flex"
                                //key={order.product.id}
                            >
                                {/* <div className="col-md-4 d-flex align-items-center text-center">
                                    <div className="item-img p-1">
                                        <img
                                            src={order.img ? order.img : defImg}
                                            alt="item"
                                            className="item-summary-img w-50 p-2"
                                        />
                                    </div>
                                </div> */}
                                <div className="col-md-8 border-left desc-col d-flex align-items-center">
                                    <div
                                        className="item-desc mt-2"
                                        style={{ minHeight: "70px" }}
                                    >
                                        <div className="d-flex">
                                            <h4 className="title text-uppercase">
                                                {order.name}
                                            </h4>
                                            {/* <p className="ml-3">
                                                (
                                                {
                                                    order.product
                                                        .second_item_number
                                                }
                                                )
                                            </p> */}
                                        </div>
                                        <div>
                                            <div className="d-flex flex-wrap justify-content-between">
                                                <div>
                                                    <b>
                                                        Cena:{" "}
                                                        <span className="order-text-value mr-3">
                                                            {order.unitPrice} zł
                                                        </span>
                                                    </b>
                                                </div>
                                                <div className="order-history-delivery">
                                                    <span className="mr-3 mb-4">
                                                        <b className="mr-1">
                                                            Ilość
                                                            zamówiona/dostarczona:
                                                        </b>
                                                        <b className="order-text-value">
                                                            {
                                                                order.quantityOrdered
                                                            }{" "}
                                                            /{" "}
                                                            {
                                                                order.quantityDelivered
                                                            }
                                                        </b>
                                                    </span>
                                                </div>
                                                <div className="add-remove">
                                                    <span className="mr-3 mb-3">
                                                        <b>Razem: </b>
                                                        <b className="order-text-value">
                                                            {order.total} zł
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
            }
            return setClickedOrder(selectedOrderView);
        });
    };
    if (orders) {
        confirmedOrder = orders.map((order, i) => (
            <tr>
                <td>{order.date_of_order}</td>
                {/* <td>{order.ship_to_number}</td> */}
                <td>
                    {order.status}
                    <button onClick={() => orderDetailHandler(i)}></button>
                </td>
                <td style={{ textAlign: "right" }}>
                    {order.order_total_amount} {order.currency_code}
                </td>
            </tr>
        ));
    }
    return (
        <div className="order-history">
            <div className="container-fluid p-5">
                <NavMenu />
                <div className="row">
                    <div className="col-12">
                        <h4 className="order-list ml-1">
                            {orders.length === 0 ? (
                                <>
                                    <h2>Lista zamówień jest pusta</h2>
                                    <Link
                                        to="/"
                                        className="btn btn-outline-primary mt-4"
                                    >
                                        {" "}
                                        Wróć do sklepu
                                    </Link>
                                </>
                            ) : (
                                "Lista zamówień:"
                            )}
                        </h4>
                    </div>
                </div>
                <Spinner />
                <div className="row">
                    <div className="col-sm-12 col-md-5 order-container">
                        <table className="w-100">
                            <tr>
                                <th>Data</th>
                                {/* <th>Miejsce dostawy</th> */}
                                <th>Status</th>
                                <th>Netto</th>
                            </tr>
                            {confirmedOrder.reverse()}
                        </table>
                    </div>
                    <div className="col-sm-12 col-md-7">{clickedOrder}</div>
                </div>
            </div>
        </div>
    );
};
export default OrderHistory;
