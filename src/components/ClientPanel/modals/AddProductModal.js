import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addProductConfirmationModalState } from "../../../actions/index";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/add-product-modal.scss";

const AddProductModal = props => {
    const addConfirmProductModalState = useSelector(
        state => state.cartReducer.addConfirmProductModalState,
    );
    const { productName } = useSelector(state => state.subscriptionReducer);
    const { productQuantity } = useSelector(state => state.subscriptionReducer);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const hideModalHandler = () => {
        dispatch(addProductConfirmationModalState(false));
    };

    useEffect(() => {
        if (
            addConfirmProductModalState === true ||
            addConfirmProductModalState === "error"
        ) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [addConfirmProductModalState]);

    return (
        <div className="add-product-modal">
            <Modal
                {...props}
                size="lg"
                aria-labelledby="cocontained-modal-title-vcenter"
                centered
                show={show}
                onHide={hideModalHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-uppercase">
                        {t("AddProductModal.ProduktyDodaneDoKoszyka")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addConfirmProductModalState === "error" ? (
                        <h5>
                            Dodanie tego produktu obecnie nie jest możliwe,
                            skontaktuj sie ze swoim opiekunem
                        </h5>
                    ) : (
                        <h6>
                            {t("AddProductModal.DoKoszykaDodanoProdukt")}{" "}
                            <b className="product-name text-uppercase">
                                {productName}
                            </b>{" "}
                            {t("AddProductModal.WIlości")}{" "}
                            <b className="product-name">{productQuantity}</b>{" "}
                            {t("AddProductModal.Szt")}
                        </h6>
                    )}
                </Modal.Body>
                <Modal.Footer className="text-center">
                    <Button
                        type="button"
                        className="close-button"
                        onClick={hideModalHandler}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddProductModal;
