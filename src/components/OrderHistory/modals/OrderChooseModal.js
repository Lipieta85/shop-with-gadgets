import React from "react";
import { useDispatch } from "react-redux";
import { orderCancel } from "../../../actions/index";
import { useTranslation } from "react-i18next";
import '../../../assets/styles/order-choose-modal.scss';
const ChooseModal = props => {
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                {t("Order.AnulujZamówienie")}
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-left">
                            <p>
                                <b className="text-uppercase modal-text-header">
                                    Anulowanie Zamówienia
                                </b>
                            </p>
                            <p className="modal-text-content">
                                {t("Order.PotwierdzenieAnulowaniaZamówienia")}{" "}
                                {props.showedOrderNumber}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                                variant='conf-button'
                            >
                                {t("Order.Nie")}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                                onClick={() =>
                                    dispatch(
                                        orderCancel(token, props.orderNumber),
                                    )
                                }
                            >
                                {t("Order.Tak")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseModal;
