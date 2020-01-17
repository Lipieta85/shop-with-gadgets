import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { signOut } from "../../actions/authorization";
import { acceptPolicy } from "../../actions/index";
import "../../assets/styles/store-policy-modal.scss";
import host from "../../api/host";

const PolicyAcceptedModal = props => {
    const { t } = useTranslation();

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    const signOutHandler = () => {
        dispatch(signOut());
        window.location.replace(`${host}/site/desktop`);
    };

    return (
        <div className="store-policy-modal">
            <Modal
                {...props}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Akceptacja regulaminu
                        {props.name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Aby korzystać z funkcji sklepu musisz zaakceptować
                        regulamin sklepu
                    </p>
                    <p></p>
                </Modal.Body>
                <Modal.Footer>
                    <p>Czy akceptujesz regulamin sklepu ?</p>
                    <Button
                        className="btn btn-warning"
                        onClick={() => dispatch(acceptPolicy(token))}
                    >
                        Tak
                    </Button>
                    <Button onClick={signOutHandler}>Nie</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PolicyAcceptedModal;
