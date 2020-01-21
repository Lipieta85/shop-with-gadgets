import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ButtonToolbar, Button } from "react-bootstrap";
import ClientModal from "./ClientModal";
import ClientResponseModal from "./ClientResponseModal";
import NotificationModal from "./NotificationModal";
import AlertModal from "./AlertModal";
import {setProductName} from "../../actions/index"
import "../../assets/styles/buttons.scss";

const ButtonComponent = props => {
    const subsriptionState = useSelector(
        state => state.subscriptionReducer.subscribeState,
    );
    const basketData = useSelector(state => state.cartReducer);
    const orderType = useSelector(
        state => state.clientDataReducer.marketingOrderType,
    );
    const [productQuantity, setProductQuantity] = useState({ id: 1 });
    const products = useSelector(state => state.cartReducer.items);
    const [disabled, setDisabled] = useState(false);
    const [quantityLocation] = useState(true);
    const [name, setName] = useState("");
    const [productid, setProductid] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowResponse, setModalShowResponse] = React.useState(false);
    const [modalShowPaidOrders, setModalShowPaidOrders] = React.useState(false);
    const [modalShowAlert, setModalShowAlert] = React.useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const input = useRef();

    const token = localStorage.getItem("token");

    const clientResponseModal = document.querySelector(
        "#clientResponseButtonModal",
    );

    useEffect(() => {
        setModalShow(false);
        if (subsriptionState === true) {
            clientResponseModal.click();
        }
        if (subsriptionState === false) {
            clientResponseModal.click();
        }
        //eslint-disable-next-line
    }, [subsriptionState]);

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
        if (disabled && props.availabaleItemQuantity > 0) {
            setModalShowAlert(true);
            return false;
        }
        if (input.current.value < 0) {
            setModalShowAlert(true);
            return false;
        }
        if (props.availabaleItemQuantity === 0) {
            event.preventDefault();
            return false;
        }
        if (
            input.current.value * props.price > basketData.budget &&
            orderType === "S5"
        ) {
            setModalShowPaidOrders(true);
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

    const handleShowModal = () => {
        setModalShow(true);
        setName(props.itemTitle);
        dispatch(setProductName(props.itemTitle))
        setProductid(props.itemId);
    };

    const handleShowModalResponse = () => {
        setModalShowResponse(true);
    };

    return (
        <>
            {props.availabaleItemQuantity === 0 ? (
                <>
                    <div className="product-input col-12 p-0 d-flex align-items-center justify-content-center">
                        <ButtonToolbar className="w-100">
                            <Button
                                className="availability-check unselectable"
                                onClick={handleShowModal}
                            >
                                {t("Button.PowiadomODostępności")}
                            </Button>
                            <ClientModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                name={name}
                                productid={productid}
                            />
                        </ButtonToolbar>
                    </div>
                    <div>
                        <ButtonToolbar className="invisible">
                            <Button
                                className="availability-check unselectable"
                                id="clientResponseButtonModal"
                                onClick={handleShowModalResponse}
                            >
                                {t("Button.PowiadomODostępności")}
                            </Button>
                            <ClientResponseModal
                                show={modalShowResponse}
                                onHide={() => setModalShowResponse(false)}
                                name={name}
                            />
                        </ButtonToolbar>
                    </div>
                </>
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
            {props.availabaleItemQuantity !== 0 && (
                <div className="product-basket-icon col-5 p-0">
                    <FontAwesomeIcon
                        icon={faShoppingBasket}
                        size="2x"
                        color={
                            props.availabaleItemQuantity === 0
                                ? "#e2e2e2"
                                : "#a0a3a6"
                        }
                        data-toggle="modal"
                        data-target="#proposalModal"
                        onClick={dispatchHandler}
                        cursor="pointer"
                        className="icon-anim"
                    />
                </div>
            )}
            <ButtonToolbar className="invisible">
                <Button
                    className="availability-check unselectable paid-orders-modal"
                    id="paid-orders-modal"
                ></Button>
                <NotificationModal
                    show={modalShowPaidOrders}
                    onHide={() => setModalShowPaidOrders(false)}
                    text={t("PaidOrder.OstrzeżenieZamówieniePłatne")}
                    header="Przekroczenie dostępnego budżetu"
                    itemTitle={props.itemTitle}
                    price={props.price}
                    unit={props.itemUnit}
                    budget={basketData.budget}
                    currency={props.currency}
                    inputValue={input.current&&input.current.value}
                />
                <Button
                    className="availability-check unselectable alert-modal"
                    id="alert-modal"
                ></Button>
                <AlertModal
                    show={modalShowAlert}
                    onHide={() => setModalShowAlert(false)}
                    header={t("Button.WartośćAlertHeader")}
                    text={t("Button.WartośćAlertText")}
                />
            </ButtonToolbar>
        </>
    );
};

export default ButtonComponent;
