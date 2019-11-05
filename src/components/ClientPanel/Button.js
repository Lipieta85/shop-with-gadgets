import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToBasket } from "../../actions/index";

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
            <div className="col-9 p-0">
                <button
                    onClick={dispatchHandler}
                    className="btn btn-outline-primary"
                >
                    Dodaj do koszyka
                </button>
            </div>
            <div className="col-3 p-0">
                <input
                    type="text"
                    className="btn btn-outline-primary product-input"
                    id={props.itemId}
                    defaultValue={productQuantity.id}
                    onChange={changeQuantityHandler}
                />
            </div>
        </>
    );
};

export default Button;
