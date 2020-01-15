import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const NotificationModal = props => {
    const serverAddress =
        "https://mh-ecommerce-dev.bpower2.com/index.php/workflow/workflowInstance/createByKeyword/keyword/";
    // const wixClientData = useSelector(
    //     state =>
    //         state.clientDataReducer.clientData[0] &&
    //         state.clientDataReducer.clientData[0].getWixClientData,
    // );

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
                Ilość produktów jaką chcesz zamówić przekracza dostępny budżet
                marketingowy. Jeśli chcesz zamówić większą ilość, wypełnij
                wniosek o możliwość składania zamówień płatnych. Uwaga: po
                złożeniu wniosku i jego zaakceptowaniu przez przedstawiciela
                MANN+HUMMEL FT Poland Twój budżet marketingowy na gadżety
                zostanie wyzerowany. Od tej chwili aż do przyznania Ci nowego
                budżetu marketingowego na gadżety wszystkie Twoje zamówienia
                będą realizowane w trybie pełnej płatności na podstawie faktury
                wystawionej przez MANN+HUMMEL FT Poland.
            </Modal.Body>
            <Modal.Footer>
                {/* <Button href={serverAddress + wixClientData.paidOrderApplicationWorkflowConfId}>Wyslij wniosek</Button> */}

                <Button href={serverAddress + "74"}>Wyslij wniosek</Button>
                <Button onClick={props.onHide}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NotificationModal;
