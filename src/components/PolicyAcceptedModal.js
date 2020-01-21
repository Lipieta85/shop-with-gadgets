import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { signOut } from "../actions/authorization";
import { acceptPolicy } from "../actions/index";
import "../assets/styles/policy-modal.scss";
import host2 from "../api/host2";
import host from "../api/host";

const PolicyAcceptedModal = props => {
    const storePolicyStatus = useSelector(
        state => state.clientDataReducer.storePolicyStatus,
    );
    const [show, setShow] = React.useState(false);
    const { t } = useTranslation();

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    useEffect(() => {
        if (storePolicyStatus === true) {
            setShow(false);
        }
        if (
            storePolicyStatus === false &&
            window.location.pathname !== `/Regulations`
        ) {
            setShow(true);
        }
    }, [storePolicyStatus]);

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
                show={show}
            >
                <Modal.Header>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        className="mx-auto"
                    >
                        <p>Akceptacja regulaminu</p>
                        {props.name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {storePolicyStatus !== "error" ? (
                        <div>
                            <p className="text-center">
                                Aby korzystać z funkcji sklepu musisz
                                zaakceptować regulamin sklepu
                            </p>
                            <a
                                href={`${host2}/Regulations`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                <p className="text-uppercase text-center">
                                    {t(`Footer.Regulamin`)}
                                </p>
                            </a>
                        </div>
                    ) : (
                        <p>Wystąpił błąd, spróbuj ponownie poźniej</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="mx-auto">
                    <p>Czy akceptujesz regulamin sklepu ?</p>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => dispatch(acceptPolicy(token))}
                    >
                        Tak
                    </Button>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={signOutHandler}
                    >
                        Nie
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PolicyAcceptedModal;
