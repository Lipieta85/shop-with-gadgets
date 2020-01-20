import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { usePromiseTracker } from "react-promise-tracker";
import "../../assets/styles/order-end.scss";

const OrderEnd = () => {
    const orderState = useSelector(state => state.orderReducer.setOrderError);
    const orderNumber = useSelector(state => state.orderReducer.orderNumber);
    const [disabled, setDisabled] = useState(true);
    const { promiseInProgress } = usePromiseTracker();
    const { t } = useTranslation();
    const [confirmText, setConfirmText] = useState(
        "",
    );

    // useEffect(() => {
    //     if (promiseInProgress === true) {
    //         setConfirmText(<h3>{t("OrderEnd.PrzetwarzanieZamówienia")}</h3>)
    //     }
    // }, [promiseInProgress, t])

    useEffect(() => {
        if (promiseInProgress === true) {
            setConfirmText(<h3>{t("OrderEnd.PrzetwarzanieZamówienia")}</h3>)
        }
        if (orderState === false) {
            setConfirmText(
                <h3>
                    {t("OrderEnd.ZamówienieONr")} {orderNumber}{" "}
                    {t("OrderEnd.PrzekazaneDoRealizacji")}
                </h3>,
            );
        }

        if (orderState === true) {
            setConfirmText(<h3>{t("OrderEnd.BłądZamówienia")}</h3>);
            setDisabled(false);
        }
        if (orderNumber > 0) {
            setDisabled(false);
        }
    }, [orderState, orderNumber, t, promiseInProgress]);

    const disabledButton = () => {
        return disabled ? { display: "none" } : { display: "block" };
    };

    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                {confirmText}
                <Spinner />

                <Link
                    to="/"
                    style={disabledButton()}
                    className="btn btn-outline-primary mt-4 w-25 mx-auto full-button"
                >
                    {" "}
                    {t("Basket.Wróć")}
                </Link>
            </div>
        </div>
    );
};

export default OrderEnd;
