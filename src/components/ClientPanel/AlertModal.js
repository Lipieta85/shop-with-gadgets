import React from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = props => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Niepoprawna wartość
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Wpisana wartość jest nieprawidłowa lub przekracza dostępną ilość w magazynie.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlertModal;
