import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { orderSelectInputValue } from "../../actions/index";
import { useTranslation } from "react-i18next";

import "../../assets/styles/order-options.scss";

const OrderOptions = () => {
    const budget = useSelector(state => state.cartReducer.budget);
    const total = useSelector(state => state.cartReducer.total);
    const addedItems = useSelector(state => state.cartReducer.addedItems);

    const selectStoreState = useSelector(
        state => state.cartReducer.orderSelectInputValue,
    );
    const deliveryData = useSelector(
        state => state.clientDataReducer.clientData,
    );
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const clientUE = useSelector(state => state.clientDataReducer.isUE);

    const [disabledCheckbox, setDisabledCheckbox] = useState(false);
    const [selectInputValue, setSelectInputValue] = useState("");

    const dispatch = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        if (orderType === "S5") {
            if (budget < 0) {
                setDisabledCheckbox(true);
            } else {
                setDisabledCheckbox(false);
            }
        }
    }, [budget, orderType]);

    useEffect(() => {
        setSelectInputValue(
            deliveryData.getWixClientData.deliveryAddresses[0].name,
        );
        //eslint-disable-next-line
    }, [selectStoreState]);

    const selectValueHandler = event => {
        setSelectInputValue(event.target.value);
    };

    const orderConfirmHandler = e => {
        if (addedItems.length === 0) {
            e.preventDefault();
            alert(`${t("Basket.AlertKoszykPusty")}`);
        } else {
            dispatch(orderSelectInputValue(selectInputValue));
        }
    };

    return (
        <div className="order-options">
            <h4 className="options-header">{t("Basket.WybierzAdres")}</h4>
            <div className="input-group mb-2">
                <div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect02"
                        onChange={selectValueHandler}
                        value={selectInputValue}
                    >
                        {deliveryData.getWixClientData.deliveryAddresses.map(
                            (data, key) => {
                                return (
                                    <option key={key} value={data.id}>
                                        {data.name}
                                    </option>
                                );
                            },
                        )}
                    </select>
                </div>
            </div>
            {!clientUE && (
                <p className="out-of-ue-info">{t("Basket.UEinfo")}</p>
            )}
            <hr />
            <div className="basket-checkout d-flex flex-wrap justify-content-between button-parent">
                <Link to="/" className="btn btn-outline-primary mt-1 w-100">
                    {t("Basket.Wróć")}
                </Link>
                <Link
                    to={disabledCheckbox === false ? "/Order" : "#"}
                    className="btn mt-1 w-100 button-parent"
                    onClick={orderConfirmHandler}
                    style={{ padding: 0 }}
                >
                    {orderType !== "S6" ? (
                        addedItems.length === 0 || +total > +budget ? (
                            <button disabled className="order-button">
                                {t("Basket.ZłóżZamówienie")}
                            </button>
                        ) : (
                            <button className="order-button">
                                {t("Basket.ZłóżZamówienie")}
                            </button>
                        )
                    ) : addedItems.length === 0 ? (
                        <button disabled className="order-button">
                            {t("Basket.ZłóżZamówienie")}
                        </button>
                    ) : (
                        <button className="order-button">
                            {t("Basket.ZłóżZamówienie")}
                        </button>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default OrderOptions;
