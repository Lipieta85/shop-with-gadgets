import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { removeCart } from "../../actions/index";
import { useTranslation } from "react-i18next";
import "../../assets/styles/add-product-modal.scss";

const DeleteModal = props => {
    const token = localStorage.getItem("token");

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const removeCartHandler = () => {
        dispatch(removeCart(token, props.itemID, props.itemunit));
        return props.onHide;
    };

    return (
        <div className="delete-cart-modal">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="cocontained-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className="text-uppercase">
                        Czy na pewno chcesz usunąć produkty z koszyka ?
                    </h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        className="close-button"
                        onClick={removeCartHandler}
                    >
                        {t(`PolicyModal.Tak`)}
                    </Button>
                    <Button
                        type="button"
                        className="close-button"
                        onClick={props.onHide}
                    >
                        {t(`PolicyModal.Nie`)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteModal;
