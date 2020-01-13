import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { postSubscribe } from "../../api/index";
const NotificationModal = props => {
    const products = useSelector(state => state.cartReducer.items);
    const [showedProduct, setShowedProduct] = useState(products.length - 1);

    const [success, setSuccess] = useState();
    const [failed, setFailed] = useState();
    const clientEmail = useSelector(
        state =>
            state.clientDataReducer.clientData[0].getWixClientData.data
                .customerServiceEmail,
    );
    const [email, setEmail] = useState(`${clientEmail}`);

    const token = localStorage.getItem("token");
    const lang = useSelector(state => state.clientDataReducer.language);

    const closeModal = () => {
        setSuccess(false);
        setFailed(false);
    };

    // const sendNotification = () => {
    //     postSubscribe(token, props.itemId, email, lang).then(res => {
    //         console.log(res.data.subscribe);
    //         if (res.data.subscribe.error) {
    //             setFailed(true);
    //         } else {
    //             setSuccess(true);
    //         }
    //     });
    // };

    return (
        <>
            {showedProduct && (
                <>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        open={props.open}
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Powiadom o dostępności produktu:{" "}
                                        {props.name}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <form>
                                            {success ? (
                                                <div
                                                    className="alert alert-success"
                                                    role="alert"
                                                >
                                                    Udało ci się zasubskrybować
                                                    przedmiot {props.itemTitle}.
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {failed ? (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    Subskrybujesz już przedmiot{" "}
                                                    {props.itemTitle} lub
                                                    wystąpił błąd.
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <label>
                                                Podaj swój adres email i kliknij
                                                „Powiadom mnie”, a otrzymasz
                                                powiadomienie, gdy produkt
                                                będzie znów dostępny.
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder={clientEmail}
                                                onChange={event =>
                                                    setEmail(event.target.value)
                                                }
                                                defaultValue={clientEmail}
                                                onClose={closeModal}
                                            ></input>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={closeModal}
                                    >
                                        Zamknij
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        // onClick={sendNotification}
                                    >
                                        Powiadom mnie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NotificationModal;
