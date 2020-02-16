import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import {
    clearBasket,
    changeDeleteAllProductsModalState,
} from "../../../actions/index";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/add-product-modal.scss";

const DeleteAllProductsModal = props => {
    const { deleteAllProductsModalState } = useSelector(
        state => state.cartReducer,
    );
    const [show, setShow] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        if (deleteAllProductsModalState) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [deleteAllProductsModalState]);

    const clearBasketHandler = () => {
        dispatch(clearBasket());
        dispatch(changeDeleteAllProductsModalState(false));
    };

    const hideDeleteAllProductsModal = () => {
        dispatch(changeDeleteAllProductsModalState(false));
    };

    return (
        <div className="delete-cart-modal">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="cocontained-modal"
                centered
                onHide={hideDeleteAllProductsModal}
                show={show}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">
                        {t(`DeleteAllProductsModal.UsuwanieProduktówZKoszyka`)}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>
                        {t(`DeleteAllProductsModal.CzyNapewnoChceszUsunąć`)}{" "}
                        <b className="text-uppercase">
                            {t(`DeleteAllProductsModal.Wszystkie`)}
                        </b>{" "}
                        {t(`DeleteAllProductsModal.ProduktyZKoszyka`)}?{" "}
                    </h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="close-button"
                        onClick={clearBasketHandler}
                    >
                        {t(`PolicyModal.Tak`)}
                    </Button>
                    <Button
                        type="button"
                        className="close-button"
                        onClick={hideDeleteAllProductsModal}
                    >
                        {t(`PolicyModal.Nie`)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteAllProductsModal;
