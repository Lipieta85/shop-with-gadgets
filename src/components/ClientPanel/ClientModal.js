import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { sendSubscribe } from "../../actions/index";

const ClientModal = props => {
    const clientEmail = useSelector(
        state =>
            state.clientDataReducer.clientData[0].getWixClientData.data
                .customerServiceEmail,
    );
    const lang = useSelector(state => state.clientDataReducer.language);
    
    const [productId, setProductId] = useState();

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
                    Powiadom o dostępności produktu: {props.name}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <p>
                    Podaj swój adres email i kliknij „Powiadom mnie”, a
                    otrzymasz powiadomienie, gdy produkt będzie znów dostępny.
                </p>
                <input
                    onChange={event => setEmail(event.target.value)}
                    defaultValue={clientEmail}
                    className="w-50"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={sendNotification}>Powiadom mnie</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientModal;
