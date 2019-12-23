import React from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/basket-summary.scss";

const BasketSummary = () => {
    const total = useSelector(state => state.cartReducer.total);
    const items = useSelector(state => state.cartReducer.addedItems);
    let currency = [];
    if (items) {
        items.map(item => {
            // return currency.push(item.price.currency)
            return (currency = item.price.currency);
        });
    }

    return items.length!==0?(
        <div className="row basket-summary collection-item mt-1">
            <div className="col-sm-12 offset-md-4 col-md-8 p-0 summary-row">
                <div className="list-unstyled summary-p">
                    <div className="basket-summary content  p-0 m-0">
                        <li className="basket-summary-order text-uppercase">
                            <b>
                                Kwota do zapłaty: {total} {currency}
                            </b>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    ):''
};

export default BasketSummary;
