import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";
import "../../assets/styles/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
//import { postSubscribe } from "../../api/index";
import { useTranslation } from "react-i18next";

const Button = props => {
    const [productQuantity, setProductQuantity] = useState({ id: 1 });
    const products = useSelector(state => state.cartReducer.items);
    const [disabled, setDisabled] = useState(false);
    const [quantityLocation] = useState(true);
    const [clicked, setClicked] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const input = useRef();
    const token = localStorage.getItem("token");
    //const lang = useSelector(state => state.clientDataReducer.language);
    const clientEmail = useSelector(
        state =>state.clientDataReducer.clientData[0].getWixClientData.data
        &&
            state.clientDataReducer.clientData[0].getWixClientData.data
                .customerServiceEmail,
    );
    useEffect(() => {
        if (props.changeProduct) {
            if (input.current !== null) {
                input.current.value = 1;
                setProductQuantity({ id: 1 });
            }
        }
        if (disabled) {
            if (input.current !== null) {
                setProductQuantity({ id: input.current.value });
            }
        }
        products.map(item => {
            if (
                input.current &&
                item.product &&
                input.current.id === item.product.id
            ) {
                if (input.current.value > item.availability) {
                    setDisabled(true);
                } else {
                    setDisabled(false);
                }
            }
            return disabled;
        });
    }, [props.changeProduct, disabled, products, dispatch]);

    const changeQuantityHandler = event => {
        setProductQuantity({
            [event.target.id]: event.target.value,
        });
        products.map(item => {
            if (event.target.id === item.product.id) {
                if (event.target.value > item.availability) {
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
        if (props.availabaleItemQuantity === 0) {
            event.preventDefault();
            return false;
        }
        if (disabled && props.availabaleItemQuantity > 0) {
            alert(
                "Wpisana ilość produktu przekracza dostępną ilość w magazynie",
            );
            event.preventDefault();
        } else {
            dispatch(
                addItemToBasket(
                    props.itemId,
                    productQuantity,
                    props.itemUnit,
                    token,
                    quantityLocation,
                ),
            );
            setProductQuantity({ id: input.current.value });
        }
    };
    const openModal = () => {
        setClicked(true);
    };
    const sendNotification = () => {
        // postSubscribe(token, props.itemId, clientEmail, lang).then(res => {
        //     console.log(res.data.subscribe);
        // });
    };
    return (
        <>
            {clicked === true ? (
                <>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Powiadom o dostępności
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form>
                                            <label>
                                                Podaj swój adres email i kliknij
                                                „Powiadom mnie”, a otrzymasz
                                                powiadomienie, gdy produkt
                                                będzie znów dostępny.
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                placeholder={clientEmail}
                                                defaultValue={clientEmail}
                                            ></input>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Zamknij
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={sendNotification}
                                    >
                                        Powiadom mnie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
            {props.availabaleItemQuantity === 0 ? (
                <div className="product-input col-12 p-0 d-flex align-items-center justify-content-center">
                    <button
                        type="button"
                        className="availability-check unselectable"
                        onClick={openModal}
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        {t(`Card.Powiadom`)}
                    </button>
                </div>
            ) : (
                <div className="product-input col-7 p-0 d-flex align-items-center justify-content-center">
                    <input
                        type="number"
                        ref={input}
                        className="form-control product-input basket-quantity-input"
                        id={props.itemId}
                        defaultValue={productQuantity.id}
                        onChange={changeQuantityHandler}
                        min="0"
                    />
                    <span className="font-weight-bold ml-1">szt.</span>
                </div>
            )}
            {props.availabaleItemQuantity !== 0 ? (
                <div className="product-basket-icon col-5 p-0">
                    <FontAwesomeIcon
                        icon={faShoppingBasket}
                        size="2x"
                        color={
                            props.availabaleItemQuantity === 0
                                ? "#e2e2e2"
                                : "#a0a3a6"
                        }
                        onClick={dispatchHandler}
                        cursor="pointer"
                        className="icon-anim"
                    />
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Button;
