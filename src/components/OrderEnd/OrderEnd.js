import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../actions/actions";

const OrderEnd = () => {
    const dispatch = useDispatch();

    return (
        <div className="text-center mt-5" style={{ paddingTop: "180px" }}>
            <h3>
                Twoje zamówienie zostało przekazane do realizacji, czekaj na
                potwierdzenie
            </h3>
            <Link
                to="/client"
                className="btn btn-outline-primary mt-4"
                onClick={() => dispatch(clearBasket())}
            >
                Wróć do sklepu
            </Link>
        </div>
    );
};

export default OrderEnd;
