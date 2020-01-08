import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";

import "../../assets/styles/order-end.scss";

const OrderEnd = () => {
    const orderState = useSelector(state => state.orderReducer.setOrderError);
    const orderNumber = useSelector(state => state.orderReducer.orderNumber);
    const [disabled, setDisabled] = useState(true);
    const [confirmText, setConfirmText] = useState(
        <h3>
            Trwa przetwarzanie zamówienia. Proszę nie zamykać okna
            przeglądarki...
        </h3>,
    );

    useEffect(() => {
        if (orderState === false) {
            setConfirmText(
                <h3>
                    Twoje zamówienie o numerze {orderNumber} zostało przekazane
                    do realizacji. W ciągu 15 minut otrzymasz potwierdzenie
                    zamówienia na adres e-mail.
                </h3>,
            );
        }

        if (orderState === true) {
            setConfirmText(
                <h3>
                    Twoje zamówienie nie zostało złożone z powodu błędu.
                    Skontatkuj się ze swoim Opiekunem Klienta.
                </h3>,
            );
        }
        if (orderNumber > 0) {
            setDisabled(false);
        }
    }, [orderState, orderNumber]);

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
                    className="btn btn-outline-primary mt-4 w-25 mx-auto"
                >
                    {" "}
                    Wróć do sklepu
                </Link>
            </div>
        </div>
    );
};

export default OrderEnd;
