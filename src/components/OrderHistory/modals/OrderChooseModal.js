import React from "react";
import { useDispatch } from "react-redux";
import { orderCancel } from "../../../actions/index";
import { useTranslation } from "react-i18next";
import "../../../assets/styles/order-choose-modal.scss";
const ChooseModal = props => {
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <button
                type="button"
                className="btn border-button"
                variant="conf-button"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                {t("Order.CancelOrder")}
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-left">
                            <p>
                                <b className="text-uppercase modal-text-header">
                                    {t("Order.OrderCancelation")}
                                </b>
                            </p>
                            <p className="modal-text-content">
                                {t("Order.AreYouSureCancelOrder")}{" "}
                                {props.showedOrderNumber}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-primary full-button"
                                data-dismiss="modal"
                            >
                                {t("Order.No")}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary full-button"
                                data-dismiss="modal"
                                onClick={() =>
                                    dispatch(
                                        orderCancel(token, props.orderNumber),
                                    )
                                }
                            >
                                {t("Order.Yes")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseModal;
