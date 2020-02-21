import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { signOut } from "../../../actions/authorization";
import { acceptPolicy } from "../../../actions/index";
import { Link } from "react-router-dom";
import "../../../assets/styles/policy-modal.scss";
import host from "../../../api/host";

const PolicyAcceptedModal = props => {
    const storePolicyStatus = useSelector(
        state => state.clientDataReducer.storePolicyStatus,
    );
    const [show, setShow] = React.useState(false);
    const { t } = useTranslation();

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    const checkHandler = () => {
        setShow(false);
    };

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
        if (storePolicyStatus === false && props.modalStatus === true) {
            setShow(true);
        }
        //eslint-disable-next-line
    }, [storePolicyStatus, props.modalStatus]);

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
                        {t(`PolicyModal.AkceptacjaRegulaminu`)}
                        {props.name}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {storePolicyStatus !== "error" ? (
                        <div>
                            <p className="text-center">
                                {t(
                                    `PolicyModal.AbyKorzystaćZFunkcjiSklepuMusiszZaakceptowaćRegulaminSklepu`,
                                )}
                            </p>
                            <Link to="/Regulations" onClick={checkHandler}>
                                <p className="text-uppercase text-center">
                                    {t(`Footer.ShopRules`)}
                                </p>
                            </Link>
                        </div>
                    ) : (
                        <p>
                            {t(
                                `PolicyModal.WystąpiłBłądSpróbujPonowniePóźniej`,
                            )}
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer className="mx-auto">
                    <p>
                        <p>{t(`PolicyModal.CzyAkceptujeszRegulaminSklepu`)}</p>
                    </p>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => dispatch(acceptPolicy(token))}
                    >
                        {t(`PolicyModal.Tak`)}
                    </Button>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={signOutHandler}
                    >
                        {t(`PolicyModal.Nie`)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PolicyAcceptedModal;
