import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../actions/index"; 
import "../../assets/styles/basket-summary.scss";

const BasketSummary = () => {
    const total = useSelector(state => state.cartReducer.total);
    const items = useSelector(state => state.cartReducer.addedItems);
    const dispatch = useDispatch();
    let currency = [];
    if (items) {
        items.map(item => {
            // return currency.push(item.price.currency)
            return (currency = item.price.currency);
        });
    }

    return (
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
            <div className="clear-button-box"><Link to="/" className="btn pull-right clear-button" onClick={() => dispatch(clearBasket())} >Wyczyść koszyk</Link></div>
        </div>
    );
};

export default BasketSummary;
