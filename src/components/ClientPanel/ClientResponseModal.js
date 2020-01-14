import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const ClientResponseModal = props => {
    const subsriptionState = useSelector(
        state => state.subscriptionReducer.subscribeState,
    );
    const [name, setName] = useState("");

    useEffect(() => {
        setName(props.itemTitle);
    }, [props.itemTitle]);
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {subsriptionState === true || subsriptionState === 1 ? (
                    <p>
                        Udało ci się zasubskrybować produkt {name}.
                    </p>
                ) : (
                    <p>
                        Subskrybujesz już ten produkt lub wystąpił błąd.
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientResponseModal;
