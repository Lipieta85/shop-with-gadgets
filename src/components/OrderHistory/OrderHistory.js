import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector, useDispatch } from "react-redux";
import {
    getClientOrdersHistory,
    getBudgetHistory,
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
    const [showedOrder, setShowedOrder] = useState();
    const dispatch = useDispatch();

    let confirmedOrder;
    let selectedOrderView;
    

    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getClientOrdersHistory(token));
        dispatch(getBudgetHistory(token));
        orderDetailHandler(orders.length-1)
    }, [token, dispatch]);

    const orderDetailHandler = selectedOrder => {
        orders.map((order, i) => { 
            if (i === selectedOrder) {
                setShowedOrder(order);
                dispatch(getClientSingleOrdersHistory(token, order.order_id));
                if (singleOrder.length) {
                    selectedOrderView = singleOrder.map(order => {
                        return (
                            <li className="row nav-item collection-item d-flex order-item-box"/* key={order.product.id} */>
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
                                    <div className="item-desc" style={{ minHeight: "70px" }}>    
                                        <div className="d-flex">
                                            <h4 className="text-uppercase title">
                                                {order.name}
                                            </h4>
                                        </div>
                                        <div>
                                            <span>
                                                Cena:{" "}
                                                <b className="order-text-value mr-3">
                                                    {+order.unitPrice} zł
                                                </b>
                                            </span>
                                        </div>
                                        <div className="order-history-delivery">
                                            <span className="mr-3 mb-4">
                                                <span className="mr-1">Ilość zamówionych:</span>
                                                <b className="order-text-value">{+order.quantityOrdered}</b>
                                                <br/>
                                                <span className="mr-1">Ilość dostarczonych:</span>
                                                <b className="order-text-value">{+order.quantityDelivered}</b>
                                            </span>
                                            <span className="mr-1 pull-right mb-0">
                                                <b>Razem: </b>
                                                <b className="order-text-value">
                                                    {+order.total} zł
                                                </b>
                                            </span>
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
                <td>
                    <button className="row-button" onClick={()=>orderDetailHandler(i)}></button>
                    <div className="cell">
                        {order.date_of_order}
                    </div> 
                </td>
                {/* <td>{order.ship_to_number}</td> */}
                <td>
                    <button className="row-button" onClick={()=>orderDetailHandler(i)}></button>
                    <div className="cell">
                        {order.status} 
                    </div>
                </td>
                <td>
                    <button className="row-button" onClick={()=>orderDetailHandler(i)}></button>
                    <div className="cell text-right">
                        {order.order_total_amount}{" "}{order.currency_code}
                    </div>
                </td> 
            </tr>
        ));
    }
  
    return (
        <div className="order-history">
            <div className="container-fluid p-5">
                <NavMenu />
                <div className="row">
                    <div className="col-5">
                        <h4 className="order-list ml-1 mb-2">
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
                    <div className="col-7">
                        <h4 className="order-list ml-1 mb-2">
                            Szczegóły zamówienia ({showedOrder&&showedOrder.order_number})
                        </h4>
                    </div>
                </div>
                <Spinner />
                <div className="row">
                    <div className="col-5 order-container">
                        <table className="table">
                            <tr>
                                <th>Data</th>
                                {/* <th>Miejsce dostawy</th> */}
                                <th>Status</th>
                                <th>Netto</th>
                            </tr>
                            {confirmedOrder.reverse()}
                        </table>  
                    </div>
                    <div className="col-7 orders-right">
                        {clickedOrder}
                        <div className="summary-box">
                            <div className="orders-summary">
                                {/* <div>Adres dostawy: {showedOrder&&showedOrder.ship_to_number}</div> */}
                                <div className="font-weight-bold">
                                    Zapłacona kwota: {showedOrder&&showedOrder.order_total_amount} zł 
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
