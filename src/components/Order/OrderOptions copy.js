import React, { useState, useEffect } from "react";
import uuid from "uuid4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/order-options.scss";

const OrderOptions22 = () => {
    //const [isChecked, setIsChecked] = useState(false)
    const [changeBorderColor, setChangeBorderColor] = useState("");

    // useEffect(() => {
    //     console.log(isChecked)
    // }, [isChecked])

    // const toggleChange = () => {
    //     return isChecked ? setIsChecked(false) : setIsChecked(true)
    //     console.log(isChecked)
    // }

    return (
        <div className="order-options">
            <div className="container" style={{ marginTop: "140px" }}>
                <h2 className="options-header">
                    1. Wybierz sposób dostawy lub odbioru
                </h2>
                <div className="options-content mt-3">
                    <ul className="d-flex">
                        <li className="options-list list-unstyled mr-3">
                            <div className="options-delivery border border-primary rounded p-3 text-center">
                                <FontAwesomeIcon icon={faTruck} size="2x" />
                                <div className="delivery-title">
                                    Dostawa kurierem
                                </div>
                                <div className="delivery-cost pt-3">
                                    0,00 zł
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={toggleChange}
                                />
                            </div>
                        </li>
                        <li className="options-list list-unstyled mr-3">
                            <div className="options-delivery border border-primary rounded p-3 text-center">
                                <FontAwesomeIcon icon={faWarehouse} size="2x" />
                                <div className="delivery-title">
                                    Odbiór osobisty
                                </div>
                                <div className="delivery-cost pt-3">
                                    0,00 zł
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={toggleChange}
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <h2 className="options-header">2. Wybierz sposób płatności</h2>
                <h2 className="options-header">
                    3. Wpisz swoje dane do wysyłki
                </h2>
            </div>
        </div>
    );
};

export default OrderOptions22;
