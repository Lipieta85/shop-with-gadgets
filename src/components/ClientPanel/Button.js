import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToBasket } from "../../actions/index";
import "../../assets/styles/buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ButtonToolbar, Button } from "react-bootstrap";
//import { postSubscribe } from "../../api/index";
import ClientModal from "./ClientModal";
import ClientResponseModal from "./ClientResponseModal";

const ButtonComponent = props => {
    const subsriptionState = useSelector(
        state => state.subscriptionReducer.subscribeState,
    );
    const orderTypes = { S5: "S5", S6: "S6" };
    const serverAddress =
        "https://mh-ecommerce-dev.bpower2.com/index.php/workflow/workflowInstance/createByKeyword/keyword/";
    const proposalAttr = "paid-order-application-workflow-conf-id";
    const [productQuantity, setProductQuantity] = useState({ id: 1 });
    const products = useSelector(state => state.cartReducer.items);
    const [disabled, setDisabled] = useState(false);
    const [quantityLocation] = useState(true);
    const [clicked, setClicked] = useState(false); //zmienic nazwe
    const [proposal, setProposal] = useState(false);
    const [name, setName] = useState("");
    const [productid, setProductid] = useState();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowResponse, setModalShowResponse] = React.useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    
    const input = useRef();
    
    const token = localStorage.getItem("token");
    const clientData = useSelector(state => state.clientDataReducer);
    const basketData = useSelector(state => state.cartReducer);
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
        let marketingOrderType =
            clientData.clientData[0].getWixClientData.data.marketingOrderType;
        if (
            input.current.value * props.price > basketData.budget &&
            marketingOrderType === orderTypes.S5
        ) {
            setProposal(true);
            return false;
        }
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

    const handleShowModal = () => {
        setModalShow(true);
        setName(props.itemTitle);
        setProductid(props.itemId)     
    };
    const closeProposal = () => {
        setProposal(false);
    }
    
    const handleShowModalResponse = () => {
        setModalShowResponse(true);
    };

    return (
        <> 
            {proposal===true&&
                <>
                    <div
                        className="modal fade"
                        id="proposalModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="proposalModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="proposalModalLabel"
                                    >
                                        Wniosek o zamówienie płatne
                                    </h5>
                                    <button
                                        type="button" className="close"
                                        data-dismiss="modal" aria-label="Close"
                                        onClick={closeProposal}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <label>
                                            {/* Próbujesz dodać do koszyka <b>{props.itemTitle}</b> w ilości: <b>{input.current.value}</b>.  */}
                                            {/* W ramach budżetu marketingowego możesz dodać tylko <b>{Math.floor(basketData.budget/props.price)}</b>. */}
                                            Ilość produktów jaką chcesz zamówić przekracza dostępny budżet marketingowy. Jeśli chcesz zamówić większą ilość, wypełnij wniosek o możliwość składania zamówień płatnych.
                                            Uwaga: po złożeniu wniosku i jego zaakceptowaniu przez przedstawiciela 
                                            MANN+HUMMEL FT Poland Twój budżet marketingowy na gadżety zostanie wyzerowany. 
                                            Od tej chwili aż do przyznania Ci nowego budżetu marketingowego na gadżety wszystkie 
                                            Twoje zamówienia będą realizowane w trybie pełnej płatności na podstawie faktury wystawionej 
                                            przez MANN+HUMMEL FT Poland.
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeProposal}>
                                        Anuluj
                                    </button>
                                    <a href={serverAddress + proposalAttr}>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Złóż wniosek
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {props.availabaleItemQuantity === 0 ? (
                <>
                    <div className="product-input col-12 p-0 d-flex align-items-center justify-content-center">
                        <ButtonToolbar className="w-100">
                            <Button
                                className="availability-check unselectable"
                                onClick={handleShowModal}
                            >
                                Powiadom o dostępności
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
                                Powiadom o dostępności
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
        </>
    );
};

export default ButtonComponent;
