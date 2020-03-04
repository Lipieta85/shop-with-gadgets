import React from "react";
import { Modal, Button } from "react-bootstrap";
import host from "../../../api/host";
import "../../../assets/styles/order-choose-modal.scss";
import { useTranslation } from "react-i18next";

const NotificationModal = props => {
    const confAddress = `${host}/workflow/workflowInstance/createByKeyword/keyword/paid-order-application-workflow-conf-id`;
    const { t } = useTranslation();
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
                {props.itemTitle && (
                    <>
                        {t("NotificationModal.PróbujeszDodaćDoKoszyka")}{" "}
                        <b>{props.itemTitle}</b>{" "}
                        {t("NotificationModal.WIlości")}{" "}
                        <b>
                            {props.inputValue} {props.unit}
                        </b>
                        . {t("NotificationModal.WRamachBudżetuMarketingowego")}:{" "}
                        <b>
                            {props.budget > 0 ? props.budget : "0"}{" "}
                            {props.currency}
                        </b>
                        , {t("NotificationModal.MożeszDodaćTylko")}{" "}
                        <b>
                            {props.budget > 0
                                ? Math.floor(props.budget / props.price)
                                : "0"}{" "}
                            {props.unit}
                        </b>
                        {". "}
                    </>
                )}
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    href={confAddress}
                >
                    {t("Button.OrderApplication")}
                </Button>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    onClick={props.onHide}
                >
                    {t("Button.Cancel")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NotificationModal;
