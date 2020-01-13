import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector, useDispatch } from "react-redux";
import {
    getClientOrdersHistory,
    getClientSingleOrdersHistory
} from "../../actions/index";
//import defImg from "../../assets/images/default.jpg";
import { Link } from "react-router-dom";
import "../../assets/styles/order-history.scss";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import ConfirmModal from './modals/OrderConfirmModal'
import ChooseModal from './modals/OrderChooseModal';

const OrderHistory = () => {
    const orders = useSelector(state => state.orderReducer.clientOrderHistory);
    const cancelOrderStatus = useSelector(state => state.orderReducer.cancelOrderStatus);
    const singleOrder = useSelector(
        state => state.orderReducer.singleOrderHistory,
    );

    const [showedOrder, setShowedOrder] = useState();
    const [currency, setCurrency] = useState();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    let confirmedOrder;

    const token = localStorage.getItem("token");

    const modal = document.querySelector('.order-confirm-modal')

    useEffect(() => {
        dispatch(getClientOrdersHistory(token));
        if (cancelOrderStatus === true) {
            modal.click()
        }
        if (cancelOrderStatus === false) {
            modal.click()
        }
    }, [token, dispatch, cancelOrderStatus, modal])

    useEffect(() => {
        if (orders.length) {
            dispatch(getClientSingleOrdersHistory(token, orders[orders.length - 1].order_id));
            setShowedOrder(orders[orders.length - 1]);
        }
    }, [orders, dispatch, token])

    if (orders) {
        confirmedOrder = orders.map((order, i) =>
            order.status !== "Deleted" ? (
                <tr>
                    <td>
                        <button
                            className="row-button"
                            onClick={() => orderDetailHandler(i)}
                        ></button>
                        <div className="cell">{order.date_of_order}</div>
                    </td>
                    <td>
                        <button
                            className="row-button"
                            onClick={() => orderDetailHandler(i)}
                        ></button>
                        <div className="cell">{order.status}</div>
                    </td>
                    <td>
                        <button
                            className="row-button"
                            onClick={() => orderDetailHandler(i)}
                        ></button>
                        <div className="cell text-right">
                            {order.order_total_amount} {order.currency_code}
                        </div>
                    </td>
                </tr>
            ) : null,
        );
    }

    const orderDetailHandler = selectedOrder => {
        orders.map((order, i) => {
            if (i === selectedOrder) {
                setShowedOrder(order);
                setCurrency(order.currency_code);
                dispatch(getClientSingleOrdersHistory(token, order.order_id));
            };
            return null
        });
    };

    return (
        <div className="order-history">
            <div className="container-fluid order-history-container pt-5">
                <NavMenu />
                <div className="row">
                    <div className="col-sm-5">
                        <h4 className="order-list ml-1 mb-2">
                            {orders.length === 0 ? (
                                <>
                                    <h2>
                                        {t(
                                            "OrderHistory.ListaZamówieńJestPusta",
                                        )}
                                    </h2>
                                    <Link
                                        to="/"
                                        className="btn btn-outline-primary mt-4"
                                    >
                                        {" "}
                                        {t("Basket.Wróć")}
                                    </Link>
                                </>
                            ) : (
                                `${t("OrderHistory.ListaZamówień")}`
                            )}
                        </h4>
                    </div>
                    <div className="col-sm-7">
                        <h4 className="order-list ml-1 mb-2">
                            Szczegóły zamówienia (
                            {showedOrder && showedOrder.order_number})
                        </h4>
                    </div>
                </div>
                <Spinner />
                <div className="row">
                    <div className="col-sm-5 order-container">
                        <table className="table">
                            <tr>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Netto</th>
                            </tr>
                            {confirmedOrder.reverse()}
                        </table>
                    </div>
                    <div className="col-sm-7 orders-right">
                        <div className="summary-details-box">
                            <div className="summary-details">
                                {showedOrder&&
                                    <table>
                                        <tr>
                                            <td>Numer zamówienia: </td>
                                            <td><b>{showedOrder.order_number}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Data złożenia: </td>
                                            <td><b>{showedOrder.date_of_order}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Godzina: </td>
                                            <td><b>{showedOrder.time_of_order}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Adres dostarczenia: </td>
                                            <td><b>{showedOrder.ship_to_number}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Status: </td>
                                            <td><b>{showedOrder.status}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Waluta: </td>
                                            <td><b>{showedOrder.currency_code}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Zapłacona kwota: </td>
                                            <td><b>{showedOrder.order_total_amount}</b></td>
                                        </tr>
                                        {showedOrder.status_number <= 530 ? (
                                            <ChooseModal orderNumber={showedOrder.order_id} showedOrderNumber={showedOrder.order_number}/>
                                        ) : null}
                                    </table>
                                }
                            </div>
                        </div>
                        {showedOrder && <ConfirmModal showedOrderNumber={showedOrder.order_number}/>}
                        <h5>Zamówione produkty:</h5>
                        {singleOrder ? singleOrder.map(order => {
                        return (
                            <li
                                className="row nav-item collection-item d-flex order-item-box" /* key={order.product.id} */
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
                                <div className="col-md-12 desc-col d-flex align-items-center order-item">
                                    <div className="order-img"></div>
                                    <div
                                        className="item-desc"
                                        style={{ minHeight: "70px" }}
                                    >
                                        <div className="d-flex">
                                            <h4 className="text-uppercase title">
                                                {order.name}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>
                                                Cena:{" "}
                                                <b className="order-text-value mr-3">
                                                    {+order.unitPrice} {showedOrder.currency_code}
                                                </b>
                                            </span>
                                        </div>
                                        <div className="order-history-delivery">
                                            <span className="mr-3 mb-4">
                                                <span className="mr-1">
                                                    Zamówionych / dostarczonych:
                                                </span>
                                                <b className="order-text-value">
                                                    ({+order.quantityOrdered}
                                                </b>
                                                <b className="order-text-value">
                                                    {" "}
                                                    / {+order.quantityDelivered}
                                                    )
                                                </b>
                                            </span>
                                            <span className="mr-1 pull-right mb-0">
                                                <b>Razem: </b>
                                                <b className="order-text-value">
                                                    {+order.total} {showedOrder.currency_code}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    }) : null }
                        <div className="summary-box">
                            <div className="orders-summary">
                                <div className="font-weight-bold">
                                    Zapłacona kwota: {showedOrder&&showedOrder.order_total_amount} {currency}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderHistory;
