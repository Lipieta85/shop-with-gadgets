import React from "react";
import "../../assets/styles/order-summary.scss";
import { useSelector, useDispatch } from "react-redux";

const OrderSummary = () => {
    const total = useSelector(state => state.total);

    return (
        <div className="order-summary">
            <hr />
            <p className="summary-value font-weight-bold">
                Wartość zakupów: {total} zł
            </p>
            <p className="delivery-value font-weight-bold">Dostawa:</p>
            <p className="pay-method-value font-weight-bold">
                Sposób płatności:
            </p>
            <p className="summary-total font-weight-bold text-uppercase">
                Do zapłaty: {total} zł
            </p>
            <hr />
            <button className="btn btn-outline-primary">
                Przejdź do podsumowania:
            </button>
        </div>
    );
};

export default OrderSummary;
