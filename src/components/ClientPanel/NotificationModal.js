import React from "react";
import { Modal, Button } from "react-bootstrap";
import host from "../../api/host";

const NotificationModal = props => {
    const confAddress = `${host}/workflow/workflowInstance/createByKeyword/keyword/paid-order-application-workflow-conf-id`;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Wniosek o zamówienie płatne
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Próbujesz dodać do koszyka <b>{props.itemTitle}</b> w ilości: <b>{input.current.value}</b>.  */}
                {/* W ramach budżetu marketingowego możesz dodać tylko <b>{Math.floor(basketData.budget/props.price)}</b>. */}
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button href={confAddress}>Wyslij wniosek</Button>
                <Button onClick={props.onHide}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NotificationModal;
