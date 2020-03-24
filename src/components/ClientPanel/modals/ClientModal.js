import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { sendSubscribe } from "../../../actions/index";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/order-choose-modal.scss";
const ClientModal = props => {
    const clientEmail = useSelector(
        state => state.clientDataReducer.clientData.getWixClientData && 
            state.clientDataReducer.clientData.getWixClientData.userEmail,
    );
    const lang = useSelector(state => state.clientDataReducer.language);
    const [productId, setProductId] = useState();
    const { t } = useTranslation();
    const [email, setEmail] = useState(`${clientEmail}`);

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const sendNotification = () => {
        dispatch(sendSubscribe(token, productId, email, lang));
    };

    useEffect(() => {
        //setName(props.itemTitle);
        setProductId(props.productid);
    }, [props]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("ClientModal.NotifyWhenProductAvailable")}:{" "}
                    {props.name}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{t("ClientModal.Subscribe")}</p>
                <input
                    onChange={event => setEmail(event.target.value)}
                    defaultValue={clientEmail}
                    className="w-50"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="button"
                    className="btn btn-outline-primary"
                    variant="conf-button"
                    onClick={sendNotification}
                >
                    {t("ClientModal.NotifyMe")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientModal;
