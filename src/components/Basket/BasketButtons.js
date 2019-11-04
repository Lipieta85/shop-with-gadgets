import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeCart, changeBasketAmounts } from "../../actions/actions";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlusSquare, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

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

    // const addQuantityButton = event => {
    //     return input.current.value++, dispatch(addQuantity(props.itemId));
    // };

    // const subtractQuantityButton = () => {
    //     return input.current.value--, dispatch(subtractQuantity(props.itemId));
    // };

    const removeCartButton = () => {
        return dispatch(removeCart(props.itemId));
    };

    return (
        <div className="item-desc">
            <h4 className="title text-uppercase">{props.itemTitle}</h4>
            <p>{props.itemDesc}</p>
            <p>
                <b>Cena: {props.itemPrice},00 zł</b>
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
                        />
                    </b>
                </span>

                <span
                    className="basket-button btn btn-outline-primary"
                    onClick={confirmationButton}
                >
                    Aktualizuj
                </span>

                {/* <span>
                    <span
                        className="product-quantity"
                        onClick={addQuantityButton}
                        id={props.itemId}
                    >
                        <FontAwesomeIcon icon={faPlusSquare} />
                    </span>
                    <span
                        className="product-quantity"
                        onClick={subtractQuantityButton}
                        id={props.itemId}
                    >
                        <FontAwesomeIcon icon={faMinusSquare} />
                    </span>
                </span> */}
            </div>
            <div className="text-right">
                <button
                    className="btn btn-outline-primary"
                    id={props.itemId}
                    onClick={removeCartButton}
                >
                    Usuń z koszyka
                </button>
            </div>
        </div>
    );
};

export default BasketButtons;
