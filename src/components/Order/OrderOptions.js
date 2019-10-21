import React, { useState } from "react";
import checkboxesDelivery from "./Checkboxes/checkboxesDelivery";
import checkboxesPayMethod from "./Checkboxes/checkboxesPayMethod";
import Checkbox from "./Checkboxes/Checkbox";
import OrderSummary from "./OrderSummary";

import "../../assets/styles/order-options.scss";

const OrderOptions = () => {
    const [checkedItems, setCheckedItems] = useState(new Map());

    const onHandleChange = e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setCheckedItems(prevState => {
            return prevState.set(item, isChecked);
        });
        console.log(checkedItems);
    };

    return (
        <div className="order-options">
            <div className="container" style={{ marginTop: "140px" }}>
                <div className="row">
                    <div className="col-8">
                        <h2 className="options-header">
                            1. Wybierz sposób dostawy lub odbioru
                        </h2>
                        <div className="options-content mt-3">
                            <ul className="d-flex">
                                {checkboxesDelivery.map(item => (
                                    <li
                                        className="options-list list-unstyled mr-3"
                                        key={item.key}
                                    >
                                        <label className="options-delivery border border-primary rounded p-3 text-center">
                                            {item.icon}
                                            <div className="delivery-title">
                                                {item.delivery}
                                            </div>
                                            <div className="delivery-cost pt-3">
                                                {item.value}
                                            </div>
                                            <div className="list-input">
                                                <Checkbox
                                                    name={item.name}
                                                    checked={checkedItems.get(
                                                        item.name,
                                                    )}
                                                    onChange={onHandleChange}
                                                />
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h2 className="options-header">
                            2. Wybierz sposób płatności
                        </h2>
                        <div className="options-content mt-3">
                            <ul className="d-flex">
                                {checkboxesPayMethod.map(item => (
                                    <li
                                        className="options-list list-unstyled mr-3"
                                        key={item.key}
                                    >
                                        <label className="options-delivery border border-primary rounded p-3 text-center">
                                            {item.icon}
                                            <div className="delivery-title">
                                                {item.delivery}
                                            </div>
                                            <div className="delivery-cost pt-3">
                                                {item.value}
                                            </div>
                                            <div className="list-input">
                                                <Checkbox
                                                    name={item.name}
                                                    checked={checkedItems.get(
                                                        item.name,
                                                    )}
                                                    onChange={onHandleChange}
                                                />
                                            </div>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h2 className="options-header">
                            3. Wpisz swoje dane do wysyłki
                        </h2>
                        <form className="delivery-form" novalidate>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom01">Imię</label>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        id="validationCustom01"
                                        placeholder="Imię"
                                        required
                                    />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom02">
                                        Nazwisko
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        id="validationCustom02"
                                        placeholder="Nazwisko"
                                        required
                                    />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom03">
                                        Miasto
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        id="validationCustom03"
                                        placeholder="Miasto"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label for="validationCustom05">
                                        Kod pocztowy
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-primary"
                                        id="validationCustom05"
                                        placeholder="kod pocztowy"
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        Please provide a valid zip.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input
                                        className="form-check-input border-primary"
                                        type="checkbox"
                                        value=""
                                        id="invalidCheck"
                                        required
                                    />
                                    <label
                                        className="form-check-label"
                                        for="invalidCheck"
                                    >
                                        Akceptuje warunki regulaminu
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderOptions;
