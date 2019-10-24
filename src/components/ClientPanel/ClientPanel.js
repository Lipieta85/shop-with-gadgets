import React from "react";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import { useSelector, useDispatch } from "react-redux";
import { addItemToBasket } from "../../actions/actions";
import ClientPanelMenu from "../ClientPanelMenu";

const ClientPanel = () => {
    const items = useSelector(state => state.items);

    const dispatch = useDispatch();

    return (
        <div className="client-side">
            <div className="container-fluid" style={{ marginTop: "80px" }}>
                <div className="row">
                    <div className="col-sm-12 col-lg-7 offset-lg-2 order-lg-first order-last">
                        <div className="container text-center">
                            <div className="row card-container text-center">
                                {items.map(item => (
                                    <div
                                        className="card border-primary m-1 col-sm-6 col-lg-4"
                                        key={item.id}
                                    >
                                        <div className="card-img d-flex align-items-center pt-3 px-3">
                                            <div className="card-img-wrapper">
                                                <img
                                                    className="card-img-content"
                                                    src={item.img}
                                                    alt="Card-cap"
                                                ></img>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="card-body pt-0 pb-3 px-3 p-1">
                                            <h5 className="card-title mt-3 text-uppercase">
                                                {item.title}
                                            </h5>
                                            <p className="card-text">
                                                {item.desc}
                                            </p>
                                            <p className="card-text">
                                                <strong>
                                                    Cena: {item.price},00 zł
                                                </strong>
                                            </p>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        addItemToBasket(
                                                            item.id,
                                                        ),
                                                    )
                                                }
                                                className="btn btn-outline-primary"
                                            >
                                                Dodaj do koszyka
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="client-panel col-sm-12 col-lg-3 order-lg-last order-first">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPanel;
