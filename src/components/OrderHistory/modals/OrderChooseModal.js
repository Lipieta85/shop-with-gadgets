import React from "react";
import { useDispatch } from "react-redux";
import { orderCancel } from "../../../actions/index";
import { useTranslation } from "react-i18next";
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
                        <div className="modal-body text-uppercase">
                            <b>
                                {t("Order.PotwierdzenieAnulowaniaZamówienia")}{" "}
                                {props.showedOrderNumber}
                            </b>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
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
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                            >
                                {t("Order.Nie")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseModal;
