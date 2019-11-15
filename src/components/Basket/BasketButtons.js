import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeCart, changeBasketAmounts } from "../../actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const BasketButtons = props => {
    const [productAmount, setProductAmount] = useState({});

    const dispatch = useDispatch();

    const input = useRef();

    useEffect(() => {
        return setProductAmount({
            [props.itemId]: props.itemQuantity,
        });
    }, [props.itemId, props.itemQuantity]);

    const changeAmountHandler = () => {
        return setProductAmount({
            ...productAmount,
            [input.current.id]: input.current.value,
        });
    };

    const confirmationButton = () => {
        return dispatch(changeBasketAmounts(props.itemId, productAmount));
    };

    const removeCartButton = () => {
        return dispatch(removeCart(props.itemId));
    };

    return (
        <div className="item-desc">
            <div className="d-flex justify-content-between">
                <h4 className="title text-uppercase">{props.itemTitle}</h4>
                <div className="text-right">
                    <FontAwesomeIcon
                        icon={faTrash}
                        size="2x"
                        color="#a0a3a6"
                        id={props.itemId}
                        onClick={removeCartButton}
                        cursor="pointer"
                    />
                </div>
            </div>
            <div
                className="d-flex align-items-center justify-content-between flex-wrap"
                style={{ minHeight: "60px" }}
            >
                <p style={{ margin: "0" }}>
                    <b>Cena: {props.itemPrice} zł</b>
                </p>
                <div className="add-remove d-flex align-items-center">
                    <span className="mr-3">
                        <b>
                            Ilość:{" "}
                            <input
                                type="number"
                                id={props.itemId}
                                defaultValue={props.itemQuantity}
                                ref={input}
                                className="basket-quantity-input btn-outline-primary"
                                onChange={changeAmountHandler}
                                min="1"
                            />
                        </b>
                    </span>

                    <span
                        className="basket-button btn btn-outline-primary"
                        onClick={confirmationButton}
                    >
                        Aktualizuj
                    </span>
                </div>
                <div>
                    <p
                        className="basket-single-item-total font-bold font-weight-bold"
                        style={{ margin: "0" }}
                    >
                        Razem: {props.itemTotalPrice} zł
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BasketButtons;
