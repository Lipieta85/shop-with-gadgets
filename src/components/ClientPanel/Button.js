import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Button = props => {
    const [productQuantity, setProductQuantity] = useState({ id: 1 });
    const inputValue = useSelector(state => state.cartReducer.items);
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();

    const input = useRef();

    useEffect(() => {
        if (props.changeProduct) {
            input.current.value = 1;
            setProductQuantity({ id: 1 });
        }
        if (disabled) {
            setProductQuantity({ id: input.current.value });
        }
        inputValue.map(item => {
            if (input.current.id === item.product.id) {
                if (input.current.value > Number(item.availableProduct)) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }
            return disabled;
        });
    }, [props.changeProduct, disabled, inputValue]);

    const changeQuantityHandler = event => {
        setProductQuantity({
            [event.target.id]: event.target.value,
        });
        inputValue.map(item => {
            if (event.target.id === item.product.id) {
                if (event.target.value > Number(item.availableProduct)) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }
            return disabled;
        });
    };

    const dispatchHandler = event => {
        if (input.current.value < 0) {
            alert("Wpisana wartość jest nie prawidłowa");
            return false;
        }
        if (disabled) {
            alert(
                "Wpisana ilość produktu przekracza dostępną ilość w magazynie"
            );
            event.preventDefault();
        } else {
            dispatch(addItemToBasket(props.itemId, productQuantity));
        }
    };

    return (
        <>
            <div className="product-input col-7 p-0 d-flex align-items-center justify-content-center">
                <input
                    type="text"
                    ref={input}
                    className="btn-outline-primary product-input"
                    id={props.itemId}
                    defaultValue={productQuantity.id}
                    onChange={changeQuantityHandler}
                    min="0"
                />
                <span className="font-weight-bold ml-1">szt.</span>
            </div>
            <div className="product-basket-icon col-5 p-0">
                <FontAwesomeIcon
                    icon={faShoppingBasket}
                    size="2x"
                    color="#a0a3a6"
                    onClick={dispatchHandler}
                    cursor="pointer"
                />
            </div>
        </>
    );
};

export default Button;
