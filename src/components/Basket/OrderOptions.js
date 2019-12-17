import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import checkboxes from "./Checkboxes/checkboxes";
import Checkbox from "./Checkboxes/Checkbox";
import { orderSelectInputValue } from "../../actions/index";
import { mapKeys } from "lodash";

import "../../assets/styles/order-options.scss";

const OrderOptions = () => {
    const budget = useSelector(state => state.cartReducer.budget);
    const addedItems = useSelector(state => state.cartReducer.addedItems);
    //const updatedCheck = useSelector(state => state.checkedItems);
    // const inputStoreState = useSelector(
    //     state => state.cartReducer.orderInputState,
    // );
    const selectStoreState = useSelector(
        state => state.cartReducer.orderSelectInputValue,
    );
    const deliveryData = useSelector(
        state => state.clientDataReducer.clientData,
    );
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [disabledCheckbox, setDisabledCheckbox] = useState(false);
    //const [inputValue, setInputValue] = useState("");
    const [selectInputValue, setSelectInputValue] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (budget < 0) {
            setDisabledCheckbox(true);
        } else {
            setDisabledCheckbox(false);
        }
    }, [budget]);

    useEffect(() => {
        setSelectInputValue(selectStoreState);
    }, [selectStoreState]);

    const onHandleChange = e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setCheckedItems(prevState => {
            prevState.clear();
            return prevState.set(item, isChecked);
        });
        // dispatch(addChecked(item, isChecked));
    };

    // const inputHandler = event => {
    //     setInputValue(event.target.value);
    // };

    const selectValueHandler = event => {
        setSelectInputValue(event.target.value);
    };

    const orderConfirmHandler = e => {
        if (addedItems.length === 0) {
            e.preventDefault();
            alert("Koszyk jest pusty, dodaj produkt");
        } else {
            dispatch(orderSelectInputValue(selectInputValue));
        }
    };
    let orderAdressess = [];
    let arr = [];

    if (deliveryData) {
        deliveryData.map(data =>
            orderAdressess.push(data.getWixClientData.deliveryAddresses[0]),
        );
        mapKeys(orderAdressess[0], function(value, key) {
            return arr.push({ key: value });
        });
        if (arr.length) {
            dispatch(orderSelectInputValue(arr[1].key));
        }
    }

    return (
        <div className="order-options">
            <h4 className="options-header">Wybierz adres dostawy</h4>
            <div className="input-group mb-3">
                <select
                    className="custom-select"
                    id="inputGroupSelect02"
                    onChange={selectValueHandler}
                    value={selectInputValue}
                >
                    <option defaultValue>
                        {arr.length ? arr[1].key : null}
                    </option>
                    {/* <option className="options" value="Wrocław ul. Wrocławska">
                        Wrocław ul. Wrocławska
                    </option>
                    <option value="Wieluń ul. Sadowa">Wieluń ul. Sadowa</option>
                    <option value="Gdańsk ul. Gdańska">
                        Gdańsk ul. Gdańska
                    </option> */}
                </select>
            </div>
            <hr />
            {/* <h4 className="options-header">Wpisz numer zamówienia Klienta</h4>
            <input type="text" value={inputValue} onChange={inputHandler} />
            <hr /> */}
            <div className="order-type invisible" style={{ height: "0" }}>
                <h4 className="options-header">Wybierz typ zamówienia:</h4>
                <div>
                    {checkboxes.map(item => (
                        <li
                            className="options-list list-unstyled "
                            key={item.key}
                        >
                            <label className="options-delivery p-1">
                                <div
                                    className="list-input "
                                    style={
                                        disabledCheckbox
                                            ? { color: "red" }
                                            : { color: "black" }
                                    }
                                >
                                    <Checkbox
                                        id={item.id}
                                        name={item.name}
                                        checked={checkedItems.get(item.name)}
                                        onChange={onHandleChange}
                                        disabled={disabledCheckbox}
                                        type="checkbox"
                                    />

                                    <span className="ml-2 mb-2">
                                        {item.name}
                                    </span>
                                </div>
                            </label>
                        </li>
                    ))}
                </div>
            </div>
            <div className="basket-checkout d-flex flex-wrap justify-content-between">
                <Link
                    to={disabledCheckbox === false ? "/Order" : "#"}
                    className="btn btn-outline-primary mt-1 w-100"
                    onClick={orderConfirmHandler}
                >
                    Złóż zamówienie
                </Link>
                <Link to="/" className="btn btn-outline-primary mt-1 w-100">
                    Wróć do sklepu
                </Link>
            </div>
        </div>
    );
};

export default OrderOptions;
