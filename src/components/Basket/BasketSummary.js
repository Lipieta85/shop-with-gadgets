import React from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/basket-summary.scss";
import { useTranslation } from "react-i18next";
import Separator from "../Separator/Separator";

const BasketSummary = () => {
    const total = useSelector(state => state.cartReducer.total);
    const items = useSelector(state => state.cartReducer.addedItems);
    const { t } = useTranslation();
    let currency = [];
    if (items) {
        items.map(item => {
            // return currency.push(item.price.currency)
            return (currency = item.price.currency);
        });
    }

    return items.length !== 0 ? (
        <div className="row basket-summary collection-item mt-1">
            <div className="col-sm-12 offset-md-4 col-md-8 p-0 summary-row">
                <div className="list-unstyled summary-p">
                    <div className="basket-summary content  p-0 m-0">
                        <li className="basket-summary-order text-uppercase">
                            <b>
                                {t(`Basket.AmountToPay`)}: {Separator(total)}{" "}
                                {currency}
                            </b>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default BasketSummary;
