import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../actions/index";
import "../../assets/styles/order-end.scss";
import Spinner from "../UI/Spinner/Spinner";

const OrderEnd = () => {
    const dispatch = useDispatch();

    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>
                    Twoje zamówienie zostało przekazane do realizacji, czekaj na
                    potwierdzenie
                </h3>
                <Spinner />
                <Link
                    to="/"
                    className="btn btn-outline-primary mt-4"
                    onClick={() => dispatch(clearBasket())}
                >
                    {" "}
                    Wróć do sklepu
                </Link>
            </div>
        </div>
    );
};

export default OrderEnd;
