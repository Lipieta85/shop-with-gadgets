import React from "react";
import { Modal, Button } from "react-bootstrap";
import host from "../../api/host";
import "../../assets/styles/order-choose-modal.scss";
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
                  {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.itemTitle&&
                    <>
                        Próbujesz dodać do koszyka <b>{props.itemTitle}</b> w ilości: <b>{props.inputValue} {props.unit}</b>. 
                        W ramach budżetu marketingowego: <b>{props.budget} {props.currency}</b>, możesz dodać tylko <b>{Math.floor(props.budget/props.price)} {props.unit}</b>{". "}
                    </>
                }
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    href={confAddress}
                >
                    Wyslij wniosek
                </Button>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    onClick={props.onHide}
                >
                    Anuluj
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NotificationModal;
