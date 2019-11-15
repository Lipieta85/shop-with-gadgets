import React from "react";
import { useSelector } from "react-redux";

const BasketSummary = () => {
    const total = useSelector(state => state.cartReducer.total);

    return (
        <div className="row" style={{ width: "90%", margin: "0 auto" }}>
            <div className="col-sm-12 offset-md-4 col-md-8 p-0">
                <div className="border list-unstyled p-3">
                    <div className="basket-summary content  p-0 m-0">
                        <li className="basket-summary-order text-uppercase">
                            <b>Kwota do zapłaty: {total} zł</b>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketSummary;
