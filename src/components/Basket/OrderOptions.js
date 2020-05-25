import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    orderSelectInputValue,
    setDeliveryAddress2,
} from "../../actions/index";
import { useTranslation } from "react-i18next";

import "../../assets/styles/order-options.scss";

const OrderOptions = () => {
    const budget = useSelector((state) => state.cartReducer.budget);
    const addedItems = useSelector((state) => state.cartReducer.addedItems);

    const selectStoreState = useSelector(
        (state) => state.cartReducer.orderSelectInputValue,
    );
    const deliveryData = useSelector(
        (state) => state.clientDataReducer.clientData,
    );
    const orderType = useSelector(
        (state) => state.clientDataReducer.marketingOrderType,
    );
    const clientUE = useSelector((state) => state.clientDataReducer.isUE);

    const [disabledCheckbox, setDisabledCheckbox] = useState(false);
    const [selectInputValue, setSelectInputValue] = useState();

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
            selectStoreState
                ? selectStoreState
                : deliveryData.getWixClientData.deliveryAddresses[0].name,
        );
        //eslint-disable-next-line
    }, [selectStoreState]);

    const selectValueHandler = (event) => {
        event.preventDefault();
        let e = document.getElementById("order-options-select");
        let selected_value = e.options[e.selectedIndex].attributes[0].value;
        let newValue = selected_value;
        dispatch(setDeliveryAddress2(newValue));
        setSelectInputValue(event.target.value);
        dispatch(orderSelectInputValue(event.target.value));
    };

    const orderConfirmHandler = (e) => {
        if (addedItems.length === 0) {
            e.preventDefault();
            alert(`${t("Basket.BasketIsEmptyAdd")}`);
        } else {
            dispatch(orderSelectInputValue(selectInputValue));
        }
    };

    return (
        <div className="order-options">
            <h4 className="options-header">
                {t("Basket.ChooseDeliveryAddress")}
            </h4>
            <div className="input-group mb-2">
                <div>
                    <select
                        className="custom-select"
                        id="order-options-select"
                        onChange={selectValueHandler}
                        value={selectInputValue}
                    >
                        {deliveryData.getWixClientData.deliveryAddresses.map(
                            (data, key) => {
                                return (
                                    <option name={data.kli_exid} key={key}>
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
                    {t("Basket.RETURNTOTHESHOP")}
                </Link>
                <Link
                    to={disabledCheckbox === false ? "/Order" : "#"}
                    className="btn mt-1 w-100 button-parent"
                    onClick={orderConfirmHandler}
                    style={{ padding: 0 }}
                >
                    {orderType !== "S6" ? (
                        addedItems.length === 0 || +budget < 0 ? (
                            <button disabled className="order-button">
                                {t("Basket.SUBMITYOURORDER")}
                            </button>
                        ) : (
                            <button className="order-button">
                                {t("Basket.SUBMITYOURORDER")}
                            </button>
                        )
                    ) : addedItems.length === 0 ? (
                        <button disabled className="order-button">
                            {t("Basket.SUBMITYOURORDER")}
                        </button>
                    ) : (
                        <button className="order-button">
                            {t("Basket.SUBMITYOURORDER")}
                        </button>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default OrderOptions;
