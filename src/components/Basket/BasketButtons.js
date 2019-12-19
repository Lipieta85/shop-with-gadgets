import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, changeBasketQuantity } from "../../actions/index";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const BasketButtons = props => {
    const [productAmount, setProductAmount] = useState({});
    const [disabled, setDisabled] = useState(false);
    const inputValue = useSelector(state => state.cartReducer.items);
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);
    const dispatch = useDispatch();

    const input = useRef();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        return setProductAmount({
            [props.itemId]: props.itemQuantity,
        });
    }, [props.itemId, props.itemQuantity]);

    const changeAmountHandler = () => {
        setProductAmount({
            ...productAmount,
            [input.current.id]: input.current.value,
        });
        inputValue.map(item => {
            if (input.current.id === item.product.id) {
                if (input.current.value > item.availability) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }
            return disabled;
        });
    };

    const confirmationButton = event => {
        if (input.current.value <= 0) {
            //  alert("Wpisana wartość jest nie prawidłowa");
            dispatch(removeCart(token, props.itemId, props.itemUnit));
        }
        if (disabled) {
            alert(
                "Wpisana ilość produktu przekracza dostępną ilość w magazynie",
            );
            event.preventDefault();
        } else {
            dispatch(
                changeBasketQuantity(
                    props.itemId,
                    productAmount,
                    props.itemUnit,
                    token,
                ),
            );
        }
    };

    const removeCartButton = () => {
        return dispatch(removeCart(token, props.itemId, props.itemUnit));
    };

    return (
        <>
            {totalQuantity <= "0" ? (
                <Redirect to="/" />
            ) : (
                console.log("total" + totalQuantity)
            )}
            <div className="item-desc">
                <div className="d-flex justify-content-between">
                    <h4 className="title text-uppercase">{props.itemTitle}</h4>
                    <div className="text-right">
                        <FontAwesomeIcon
                            icon={faTrash}
                            color="#a0a3a6"
                            id={props.itemId}
                            onClick={removeCartButton}
                            cursor="pointer"
                            className="icon-anim f-17"
                        />
                    </div>
                </div>
                <div
                    className="d-flex align-items-center justify-content-between flex-wrap"
                    style={{ minHeight: "60px" }}
                >
                    <p style={{ margin: "0 5px 0 0" }}>
                        <span>
                            Cena: {props.itemPrice} {props.itemCurrency}
                        </span>
                    </p>
                    <div className="add-remove d-flex align-items-center">
                        <span className="mr-3">
                            <span>
                                Ilość:{" "}
                                <input
                                    type="number"
                                    id={props.itemId}
                                    defaultValue={props.itemQuantity}
                                    ref={input}
                                    className="basket-quantity-input primary-no-action"
                                    onChange={changeAmountHandler}
                                    min="1"
                                />
                            </span>
                        </span>

                        <span
                            className="basket-button btn btn-outline-primary primary-no-action actualize-btn"
                            onClick={confirmationButton}
                        >
                            Aktualizuj
                        </span>
                    </div>
                    <div>
                        <span
                            className="basket-single-item-total"
                            style={{ margin: "0" }}
                        >
                            Razem: {props.itemTotalPrice} {props.itemCurrency}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketButtons;
