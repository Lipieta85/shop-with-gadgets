import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, changeBasketQuantity } from "../../actions/index";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ButtonToolbar } from "react-bootstrap";
import DeleteModal from "./modals/DeleteModal";
import Separator from "./../Separator/Separator";
import "../../assets/styles/basket.scss";

const BasketButtons = props => {
    const [productAmount, setProductAmount] = useState({});
    const [quantityLocation] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const inputValue = useSelector(state => state.cartReducer.items);
    const totalQuantity = useSelector(state => state.cartReducer.totalQuantity);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const input = useRef();

    const token = localStorage.getItem("token");

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
                if (
                    input.current.value >
                    parseInt(item.availability, 10) +
                        parseInt(input.current.value, 10)
                ) {
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
            alert(`${t(`Basket.Alert`)}`);
            event.preventDefault();
        } else {
            dispatch(
                changeBasketQuantity(
                    props.itemId,
                    productAmount,
                    props.itemUnit,
                    token,
                    quantityLocation,
                ),
            );
        }
    };

    const handleShowModal = () => {
        setModalShow(true);
    };

    return (
        <>
            {totalQuantity <= "0" ? <Redirect to="/" /> : ""}
            <div className="item-desc">
                <div className="d-flex justify-content-between">
                    <Link to={`/product/${props.itemId}`}>
                        <h4 className="title text-uppercase">
                            {props.itemTitle}
                        </h4>
                    </Link>
                    <div className="text-right">
                        <ButtonToolbar>
                            <FontAwesomeIcon
                                icon={faTrash}
                                color="#a0a3a6"
                                id={props.itemId}
                                onClick={handleShowModal}
                                cursor="pointer"
                                className="icon-anim f-17"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Usuń"
                            />
                            <DeleteModal
                                show={modalShow}
                                itemID={props.itemId}
                                itemunit={props.itemUnit}
                                itemname={props.itemTitle}
                                onHide={() => setModalShow(false)}
                            />
                        </ButtonToolbar>
                    </div>
                </div>
                <div
                    className="d-flex align-items-center justify-content-between flex-wrap"
                    style={{ minHeight: "60px" }}
                >
                    <p style={{ margin: "0 5px 0 0" }}>
                        <span>
                            {t(`Card.Price`)}: {Separator(props.itemPrice)}{" "}
                            {props.itemCurrency}
                        </span>
                    </p>
                    <div className="add-remove d-flex align-items-center">
                        <span className="mr-3">
                            <span>
                                {t(`Basket.Qauntity`)}:{" "}
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
                            className="basket-button btn btn-outline-primary primary-no-action border-button"
                            onClick={confirmationButton}
                        >
                            {t(`Basket.Update`)}
                        </span>
                    </div>
                    <div>
                        <span
                            className="basket-single-item-total"
                            style={{ margin: "0" }}
                        >
                            {t(`Basket.Sum`)}:{" "}
                            {Separator(props.itemTotalPrice)}{" "}
                            {props.itemCurrency}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasketButtons;
