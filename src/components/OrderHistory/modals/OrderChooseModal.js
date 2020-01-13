import React from "react";
import { useDispatch } from "react-redux";
import { orderCancel } from "../../../actions/index";

const ChooseModal = (props) => {

    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    return (
        <div>
            <button
                type="button"
                className="btn btn-outline-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                Anuluj zamówienie
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
                                Czy napewno chcesz anulować zamówienie nr{" "}
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
                                        orderCancel(
                                            token,
                                            props.orderNumber,
                                        ),
                                    )
                                }
                            >
                                Tak
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                data-dismiss="modal"
                            >
                                Nie
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseModal;
