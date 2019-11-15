import React from "react";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClientPanelMenu from "../ClientPanelMenu";
import ButtonInput from "./Button";

const ClientPanel = () => {
    const items = useSelector(state => state.cartReducer.items);

    return (
        <div className="client-side">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 col-xl-10 offset-xl-0 order-lg-first order-last">
                        <div className="row card-container text-center mt-3">
                            {items.map(item => (
                                <div
                                    className="card border-secondary m-1 col-sm-6 col-lg-4"
                                    key={item.id}
                                >
                                    <Link to={`/product/${item.id}`}>
                                        <div className="card-img d-flex align-items-center pt-3 px-3">
                                            <div className="card-img-wrapper">
                                                <img
                                                    className="card-img-content"
                                                    src={item.img}
                                                    alt="Card-cap"
                                                ></img>
                                            </div>
                                        </div>
                                    </Link>
                                    <hr />
                                    <div className="card-body pt-0 pb-2 px-1">
                                        <div>
                                            <h5 className="card-title text-uppercase">
                                                {item.title}
                                            </h5>
                                        </div>
                                        <div>
                                            <p className="card-text">
                                                <strong>
                                                    Cena: {item.price} PLN/szt.
                                                </strong>
                                            </p>
                                            <span className="card-available-quantity">
                                                Dostępna ilość:{" "}
                                                {item.availableProduct} szt.
                                            </span>
                                            <div className="buttons-container row d-flex align-items-center">
                                                <ButtonInput
                                                    itemId={item.id}
                                                    availabaleItemQuantity={
                                                        item.availableProduct
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="client-panel col-sm-12 col-lg-3 col-xl-2 order-lg-last order-first">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPanel;
