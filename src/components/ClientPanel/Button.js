import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";
import "../../assets/styles/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
//import { postSubscribe } from "../../api/index";
import NotificationModal from "./NotificationModal";
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
    //const [showedProduct, setShowedProduct] = useState(products.length - 1);
    // const [email, setEmail] = useState(`${clientEmail}`);
    // const [success, setSuccess] = useState();
    // const [failed, setFailed] = useState();
    const dispatch = useDispatch();

    const input = useRef();
    const [name, setName] = useState("");
    const token = localStorage.getItem("token");
    //const lang = useSelector(state => state.clientDataReducer.language);

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
    const openModal = x => {
        setClicked(true);
        //  console.log(clicked);
        // console.log(props.itemId);
        setName(props.itemTitle);
        console.log(name);
        console.log(props.itemTitle);
    };
    // const closeModal = () => {
    //     setSuccess(false);
    //     setFailed(false);
    // };
    // const sendNotification = () => {
    //     postSubscribe(token, props.itemId, email, lang).then(res => {
    //         console.log(res.data.subscribe);
    //         if (res.data.subscribe.error) {
    //             setFailed(true);
    //         } else {
    //             setSuccess(true);
    //         }
    //     });
    // };
    return (
        <>
            {props.availabaleItemQuantity === 0 ? (
                <div className="product-input col-12 p-0 d-flex align-items-center justify-content-center">
                    <button
                        type="button"
                        className="availability-check unselectable"
                        onClick={() => openModal(name)}
                        value={props.itemTitle}
                        data-toggle="modal"
                        data-target="#exampleModal"
                    >
                        Powiadom o dostępności {name}
                    </button>

                    {clicked === true && name && (
                        <NotificationModal id={props.itemId} name={name} />
                    )}
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
