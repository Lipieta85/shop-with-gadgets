import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../actions/index";
import "../../assets/styles/order-end.scss";

const OrderEnd = () => {
    const dispatch = useDispatch();

    return (
        <div className="order-end text-center">
            <h3>
                Twoje zamówienie zostało przekazane do realizacji, czekaj na
                potwierdzenie
            </h3>
            <Link
                to="/"
                className="btn btn-outline-primary mt-4"
                onClick={() => dispatch(clearBasket())}
            >
                {" "}
                Wróć do sklepu
            </Link>
        </div>
    );
};

export default OrderEnd;
