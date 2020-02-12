import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addProductConfirmationModalState } from "../../actions/index";
import "../../assets/styles/add-product-modal.scss";

const AddProductConfirmationModal = props => {
    console.log(props);
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
                size="lg"
                aria-labelledby="cocontained-modal-title-vcenter"
                centered
                show={show}
                onHide={hideModalHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5 className="text-uppercase">
                        Produkty zostały dodane do koszyka
                    </h5>
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
