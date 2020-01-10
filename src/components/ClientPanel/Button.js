import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";
import "../../assets/styles/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { postSubscribe } from "../../api/index";
const Button = props => {
    const [productQuantity, setProductQuantity] = useState({ id: 1 });
    const products = useSelector(state => state.cartReducer.items);
    const clientEmail = useSelector(
        state =>
            state.clientDataReducer.clientData[0].getWixClientData.data
                .customerServiceEmail,
    );
    const [disabled, setDisabled] = useState(false);
    const [quantityLocation] = useState(true);
    const [clicked, setClicked] = useState(true);
    const [email, setEmail] = useState(`${clientEmail}`);
    const [success, setSuccess] = useState();
    const [failed, setFailed] = useState();
    const dispatch = useDispatch();

    const input = useRef();
    const token = localStorage.getItem("token");
    const lang = useSelector(state => state.clientDataReducer.language);

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
        //   console.log(props.itemId);
        //   console.log(props.itemTitle);
    };
    const closeModal = () => {
        setSuccess(false);
        setFailed(false);
    };
    const sendNotification = () => {
        postSubscribe(token, props.itemId, email, lang).then(res => {
            //     console.log(res.data.subscribe);
            if (res.data.subscribe.error) {
                setFailed(true);
            } else {
                setSuccess(true);
            }
        });
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
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Powiadom o dostępności produktu:{" "}
                                        {props.itemId}
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
                                            {success ? (
                                                <div
                                                    className="alert alert-success"
                                                    role="alert"
                                                >
                                                    Udało ci się zasubskrybować
                                                    przedmiot {props.itemTitle}.
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {failed ? (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    Subskrybujesz już przedmiot{" "}
                                                    {props.itemTitle} lub
                                                    wystąpił błąd.
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <label>
                                                Podaj swój adres email i kliknij
                                                „Powiadom mnie”, a otrzymasz
                                                powiadomienie, gdy produkt
                                                będzie znów dostępny.
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder={clientEmail}
                                                onChange={event =>
                                                    setEmail(event.target.value)
                                                }
                                                defaultValue={clientEmail}
                                                onClose={closeModal}
                                            ></input>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={closeModal}
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
                        Powiadom o dostępności
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
