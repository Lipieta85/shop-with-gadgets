import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addProductConfirmationModalState } from "../../actions/index";
import "../../assets/styles/add-product-modal.scss";

const AddProductConfirmationModal = props => {
    const addConfirmProductModalState = useSelector(
        state => state.cartReducer.addConfirmProductModalState,
    );
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
                backdrop="static"
                size="lg"
                aria-labelledby="cocontained-modal-title-vcenter"
                centered
                show={show}
            >
                <Modal.Body className="mx-auto">
                    Produkty zostały dodane do koszyka
                </Modal.Body>
                <Modal.Footer className="mx-auto">
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
