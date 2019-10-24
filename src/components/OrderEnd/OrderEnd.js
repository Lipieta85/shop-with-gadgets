import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearBasket } from "../../actions/actions";

const OrderEnd = () => {
    const basketState = useSelector(state => state.addedItems);
    const dispatch = useDispatch();

    return (
        <div className="text-center mt-5">
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
