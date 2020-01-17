import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const ClientResponseModal = props => {
    const subsriptionState = useSelector(
        state => state.subscriptionReducer.subscribeState,
    );
    const [name, setName] = useState("");
    const { t } = useTranslation();
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
                        {t("ClientResponseModal.UdanaSubskrypcja")}:{""}
                        {name}. {t("ClientResponseModal.UdanaSubskrypcjaInfo")}
                    </p>
                ) : (
                    <p>{t("ClientResponseModal.NieudanaSubskrypcja")}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    onClick={props.onHide}
                >
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientResponseModal;
