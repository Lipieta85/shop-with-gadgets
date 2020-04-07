import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getClientOrdersHistory,
    getClientSingleOrdersHistory,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import ConfirmModal from "./modals/OrderConfirmModal";
import ChooseModal from "./modals/OrderChooseModal";
import ScreenLock from "../ScreenLock";
import "../../assets/styles/order-history.scss";
import "../../assets/styles/order-end.scss";
import Separator from "../Separator/Separator";
import { usePromiseTracker } from "react-promise-tracker";

const OrderHistory = () => {
    const orders = useSelector(state => state.orderReducer.clientOrderHistory);
    const cancelOrderStatus = useSelector(
        state => state.orderReducer.cancelOrderStatus,
    );
    const singleOrder = useSelector(
        state => state.orderReducer.singleOrderHistory,
    );
    const lang = useSelector(state => state.clientDataReducer.language);

    const [showedOrder, setShowedOrder] = useState();
    const [showSingleOrder, setShowSingleOrder] = useState(false);

    const { promiseInProgress } = usePromiseTracker();
    let confirmedOrder;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const modal = document.querySelector(".order-confirm-modal");

    useEffect(() => {
        dispatch(getClientOrdersHistory(token));
        setShowSingleOrder(true);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (cancelOrderStatus === true) {
            modal.click();
            dispatch(getClientOrdersHistory(token));
        }
        if (cancelOrderStatus === false) {
            modal.click();
            dispatch(getClientOrdersHistory(token));
        }
    }, [token, dispatch, cancelOrderStatus, modal]);

    useEffect(() => {
        if (orders.length > 0 && showSingleOrder) {
            dispatch(
                getClientSingleOrdersHistory(
                    token,
                    orders[orders.length - 1].order_id,
                    lang,
                ),
            );

            deselectAll();
            setShowedOrder(orders[orders.length - 1]);
            selectOrder(orders[orders.length - 1]);
        }
        //eslint-disable-next-line
    }, [orders]);

    if (orders) {
        confirmedOrder = orders.map((order, i) => (
            <tr key={i} className={order.selected ? "row-selected" : ""}>
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
                    <div className="cell">{order.status_number && t("OpTypes."+order.status_number)}</div>
                </td>
                <td>
                    <button
                        className="row-button"
                        onClick={() => orderDetailHandler(i)}
                    ></button>
                    <div className="cell text-right">
                        {order.status_number !== "999"
                            ? Separator(
                                  (+order.order_total_amount).toFixed(2),
                              ) +
                              " " +
                              order.currency_code
                            : t("OrderHistory.IsCancelled")}
                    </div>
                </td>
            </tr>
        ));
    }

    const deselectAll = () => {
        orders.map((order, i) => {
            return (order["selected"] = false);
        });
    };
    const selectOrder = order => {
        if (order) {
            order["selected"] = true;
        }
    };

    const orderDetailHandler = (selectedOrder, e) => {
        deselectAll();
        orders.map((order, i) => {
            if (i === selectedOrder) {
                selectOrder(order);
                setShowedOrder(order);

                dispatch(
                    getClientSingleOrdersHistory(token, order.order_id, lang),
                );
            }
            return null;
        });
    };

    return (
        <div className="order-history">
            <div className="container-fluid order-history-container pt-5">
                <ScreenLock />
                {orders.length === 0 && promiseInProgress === false ? (
                    <div className="text-center">
                        <div className="order-end-box p-4">
                            <h4>{t("OrderHistory.TheOrderListIsEmpty")}</h4>
                            <Link
                                to="/"
                                className="btn btn-outline-primary mt-3"
                            >
                                {" "}
                                {t("Basket.RETURNTOTHESHOP")}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="order-list ml-1 mb-2">
                                <h2 className="header-title">
                                    {t("OrderHistory.OrderList")}
                                </h2>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <h4 className="order-list ml-1 mb-2 header-title">
                                {orders.length !== 0 &&
                                    t("OrderHistory.DetailsOfOrder") +
                                        " (" +
                                        (showedOrder &&
                                            showedOrder.order_number) +
                                        ")"}
                            </h4>
                        </div>
                    </div>
                )}
                <Spinner />
                {orders.length !== 0 ? (
                    <div className="row">
                        <div className="col-sm-5 order-container">
                            <table className="w-100">
                                <thead>
                                    <tr>
                                        <th>{t("OrderHistory.Date")}</th>
                                        <th>{t("OrderHistory.Status")}</th>
                                        <th>{t("OrderHistory.NetAmount")}</th>
                                    </tr>
                                </thead>
                                <tbody>{confirmedOrder.reverse()}</tbody>
                            </table>
                        </div>
                        <div className="col-sm-7 orders-right">
                            <div className="summary-details-box">
                                <div className="summary-details">
                                    {showedOrder && singleOrder && (
                                        <>
                                            <table className="w-100">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.OrderNumber",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    showedOrder.order_number
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.OrderDate",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    showedOrder.date_of_order
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.Time",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    showedOrder.time_of_order
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.Currency",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    showedOrder.currency_code
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.Delivery",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {
                                                                    singleOrder.shippingAddress
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.Status",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {showedOrder.status_number && 
                                                                    t("OpTypes."+showedOrder.status_number)
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {t(
                                                                "OrderHistory.AmountPaid",
                                                            )}{" "}
                                                        </td>
                                                        <td>
                                                            <b>
                                                                {Separator(
                                                                    (+showedOrder.order_total_amount).toFixed(
                                                                        2,
                                                                    ),
                                                                )}{" "}
                                                                {
                                                                    showedOrder.currency_code
                                                                }
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    {showedOrder.placing_order_person_login ? (
                                                        <tr>
                                                            <td>
                                                                {t(
                                                                    "OrderHistory.OrderPerson",
                                                                )}
                                                                :{" "}
                                                            </td>
                                                            <td>
                                                                <b>
                                                                    {
                                                                        showedOrder.placing_order_person_login
                                                                    }
                                                                </b>{" "}
                                                                <b>
                                                                    {showedOrder.placing_order_person_name
                                                                        ? showedOrder.placing_order_person_name
                                                                        : null}
                                                                </b>
                                                            </td>
                                                        </tr>
                                                    ) : null}
                                                </tbody>
                                            </table>
                                            <div
                                                className="w-100 text-right"
                                                style={
                                                    showedOrder.placing_order_person_login
                                                        ? { marginTop: "15px" }
                                                        : null
                                                }
                                            >
                                                {showedOrder.status_number <=
                                                530 ? (
                                                    <div className="mr-1 mb-1">
                                                        <ChooseModal
                                                            orderNumber={
                                                                showedOrder.order_id
                                                            }
                                                            showedOrderNumber={
                                                                showedOrder.order_number
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {showedOrder && (
                                <ConfirmModal
                                    showedOrderNumber={showedOrder.order_number}
                                />
                            )}
                            {showedOrder &&
                            showedOrder.status === "Deleted" ? (
                                ""
                            ) : (
                                <h5 className="header-title">
                                    {t("OrderHistory.OrderedProducts")}
                                </h5>
                            )}
                            {singleOrder.items
                                ? singleOrder.items.map((order, i) => {
                                      return (
                                          <li
                                              className="row nav-item collection-item d-flex order-item-box"
                                              key={i}
                                          >
                                              <div className="col-md-12 desc-col d-flex order-item">
                                                  <span className="order-iteration">
                                                      {i + 1}
                                                  </span>
                                                  <div className="order-img-box">
                                                      {order.image && (
                                                          <img
                                                              src={order.image}
                                                              className="order-img"
                                                              alt="orderPicture"
                                                          />
                                                      )}
                                                  </div>
                                                  <div
                                                      className="item-desc"
                                                      style={{
                                                          minHeight: "70px",
                                                      }}
                                                  >
                                                      <div className="d-flex">
                                                          <h4 className="text-uppercase title">
                                                              <b>
                                                                  {" "}
                                                                  {order.name} (
                                                                  {order.code})
                                                              </b>
                                                          </h4>
                                                      </div>
                                                      <div>
                                                          <span>
                                                              {t(
                                                                  "OrderHistory.Price",
                                                              )}{" "}
                                                              <b className="order-text-value mr-3">
                                                                  {Separator(
                                                                      +order.unitPrice,
                                                                  )}{" "}
                                                                  {showedOrder &&
                                                                      showedOrder.currency_code}
                                                              </b>
                                                          </span>
                                                      </div>
                                                      <div className="order-history-delivery">
                                                          <span className="mr-3 mb-4">
                                                              <span className="mr-1">
                                                                  {t(
                                                                      "OrderHistory.Ordered-delivered",
                                                                  )}
                                                              </span>
                                                              <b className="order-text-value">
                                                                  (
                                                                  {
                                                                      +order.quantityOrdered
                                                                  }
                                                              </b>
                                                              <b className="order-text-value">
                                                                  {" "}
                                                                  /{" "}
                                                                  {
                                                                      +order.quantityDelivered
                                                                  }
                                                                  )
                                                              </b>
                                                          </span>
                                                          <span className="pull-right mb-0">
                                                              <b>
                                                                  {t(
                                                                      "OrderHistory.Sum",
                                                                  )}{" "}
                                                              </b>
                                                              <b className="order-text-value">
                                                                  {Separator(
                                                                      (+order.total).toFixed(
                                                                          2,
                                                                      ),
                                                                  )}{" "}
                                                                  {showedOrder &&
                                                                      showedOrder.currency_code}
                                                              </b>
                                                          </span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </li>
                                      );
                                  })
                                : null}
                            {showedOrder &&
                            showedOrder.status === "Deleted" ? (
                                ""
                            ) : (
                                <div className="summary-box">
                                    <div className="orders-summary">
                                        <div className="font-weight-bold">
                                            {t("OrderHistory.AmountPaid")}{" "}
                                            {showedOrder &&
                                                Separator(
                                                    showedOrder.order_total_amount.toFixed(
                                                        2,
                                                    ),
                                                )}{" "}
                                            {showedOrder &&
                                                showedOrder.currency_code}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
export default OrderHistory;
