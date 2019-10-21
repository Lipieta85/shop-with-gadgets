import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasketSummary = () => {
    const total = useSelector(state => state.total);

    return (
        <div className="row">
            <div className="offset-4 col-md-8 p-0">
                <li className="nav-item list-unstyled basket-summary">
                    <div className="border list-unstyled p-3">
                        <div className="basket-summary content  p-0 m-0">
                            <li className="basket-summary-order text-uppercase">
                                <b>Razem: {total}zł</b>
                            </li>
                        </div>
                        <div className="basket-checkout text-right">
                            <Link
                                to="/Order"
                                className="btn btn-outline-primary"
                            >
                                Złóż zamówienie
                            </Link>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default BasketSummary;
