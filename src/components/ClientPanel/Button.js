import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../../actions/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Button = props => {
    const [productQuantity, setProductQuantity] = useState({ id: 1 });

    const dispatch = useDispatch();

    const changeQuantityHandler = event => {
        setProductQuantity({
            [event.target.id]: event.target.value,
        });
    };

    const dispatchHandler = () => {
        dispatch(addItemToBasket(props.itemId, productQuantity));
    };

    return (
        <>
            <div className="product-input col-7 p-0 d-flex align-items-center justify-content-center">
                <input
                    type="text"
                    className="btn-outline-primary product-input"
                    id={props.itemId}
                    defaultValue={productQuantity.id}
                    onChange={changeQuantityHandler}
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
