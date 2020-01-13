import React from "react";
import { useSelector } from "react-redux";

const ConfirmModal = (props) => {
    const cancelOrderStatus = useSelector(state => state.orderReducer.cancelOrderStatus);
    return (
        <div>
            <button
                type="button"
                className="order-confirm-modal invisible"
                data-toggle="modal"
                data-target="#confirmModal"
            >
            </button>

            <div
                className="modal fade"
                id="confirmModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-uppercase">
                            <b>
                                {cancelOrderStatus === true || cancelOrderStatus === 1 ? `Twoje zamówienie o nr ${props.showedOrderNumber} zostało anulowane` : "Nie udało się anulować zamówienia"}
                            </b>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
