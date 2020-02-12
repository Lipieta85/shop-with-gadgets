import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addProductConfirmationModalState } from "../../actions/index";
import "../../assets/styles/add-product-modal.scss";

const AddProductConfirmationModal = props => {
    const addConfirmProductModalState = useSelector(
        state => state.cartReducer.addConfirmProductModalState,
    );
    const { productName } = useSelector(state => state.subscriptionReducer);
    const { productQuantity } = useSelector(state => state.subscriptionReducer);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const hideModalHandler = () => {
        dispatch(addProductConfirmationModalState());
    };

    useEffect(() => {
        if (addConfirmProductModalState) {
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
                        Produkty dodane do koszyka
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="text-uppercase">
                        Do koszyka dodano produkt{" "}
                        <b className="product-name">{productName}</b> w ilości{" "}
                        <b className="product-name">{productQuantity}</b> szt.
                    </h6>
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

export default AddProductConfirmationModal;
