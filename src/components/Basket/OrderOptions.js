import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import checkboxes from "./Checkboxes/checkboxes";
import Checkbox from "./Checkboxes/Checkbox";
import { addChecked } from "../../actions/actions";

import "../../assets/styles/order-options.scss";

const OrderOptions = () => {
    const budget = useSelector(state => state.budget);
    const updatedCheck = useSelector(state => state.checkedItems);
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [disabledCheckbox, setDisabledCheckbox] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (budget < 0) {
            setDisabledCheckbox(true);
        } else {
            setDisabledCheckbox(false);
        }
    }, [budget]);

    const onHandleChange = e => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setCheckedItems(prevState => {
            return prevState.set(item, isChecked);
        });
        dispatch(addChecked(checkedItems));
        console.log(checkedItems);
    };

    return (
        <div className="order-options">
            <h4 className="options-header">Wybierz adres dostawy</h4>
            <div className="input-group mb-3">
                <select className="custom-select" id="inputGroupSelect02">
                    <option selected>Wrocław ul. Sadowa</option>
                    <option value="1">Wrocław</option>
                    <option value="2">Wieluń</option>
                    <option value="3">Gdańsk</option>
                </select>
            </div>
            <hr />
            <h4 className="options-header">Wpisz numer zamówienia Klienta</h4>
            <input type="text" />
            <hr />
            <div className="order-type">
                <h4 className="options-header">Wybierz typ zamówienia:</h4>
                <div>
                    {checkboxes.map(item => (
                        <li
                            className="options-list list-unstyled"
                            key={item.key}
                        >
                            <label className="options-delivery p-1">
                                <div
                                    className="list-input"
                                    style={
                                        disabledCheckbox
                                            ? { color: "red" }
                                            : { color: "black" }
                                    }
                                >
                                    {item.name}
                                    <Checkbox
                                        name={item.name}
                                        checked={updatedCheck.get(item.name)}
                                        onChange={onHandleChange}
                                        disabled={disabledCheckbox}
                                    />
                                </div>
                            </label>
                        </li>
                    ))}
                </div>
            </div>
            <div className="basket-checkout d-flex flex-wrap justify-content-between">
                <Link to="/client" className="btn btn-outline-primary mt-1">
                    Wróć do sklepu
                </Link>
                <Link
                    to={disabledCheckbox === false ? "/Order" : "#"}
                    className="btn btn-outline-primary mt-1"
                >
                    Złóż zamówienie
                </Link>
            </div>
        </div>
    );
};

export default OrderOptions;
