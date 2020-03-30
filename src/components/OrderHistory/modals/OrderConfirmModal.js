import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/order-choose-modal.scss";

const ConfirmModal = props => {
    const cancelOrderStatus = useSelector(
        state => state.orderReducer.cancelOrderStatus,
    );
    const { t } = useTranslation();
    return (
        <div>
            <button
                type="button"
                className="order-confirm-modal invisible"
                data-toggle="modal"
                data-target="#confirmModal"
            ></button>

            <div
                className="modal fade"
                id="confirmModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-uppercase">
                            <b>
                                {cancelOrderStatus === true ||
                                cancelOrderStatus === 1
                                    ? `${t("OrderHistory.YourOrderNo")} ${props.showedOrderNumber} ${t("OrderHistory.Cancelled")}`
                                    : t("OrderHistory.NotCancelled")}
                            </b>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-primary full-button"
                                variant="conf-button"
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
