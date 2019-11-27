import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientPanelMenu from "../ClientPanelMenu";
import ButtonInput from "./Button";
import { initProducts } from "../../actions/index";
import Spinner from "../UI/Spinner/Spinner";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";

const ClientPanel = () => {
    const items = useSelector(state => state.cartReducer.items);
    const error = useSelector(state => state.cartReducer.error);

    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        dispatch(initProducts(token));
    }, [dispatch, token]);

    let product = error ? <p>Products can't be loaded!</p> : <Spinner />;

    if (items) {
        product = items.map(item => (
            <div
                className="card border-secondary m-1 col-sm-6 col-lg-4"
                key={item.product.id}
            >
                <Link to={`/product/${item.product.id}`}>
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
                    <div
                        className="card-title-container"
                        style={{ minHeight: "50px" }}
                    >
                        <h5 className="card-title text-uppercase">
                            {item.product.description1}
                        </h5>
                    </div>
                    <div>
                        <p className="card-text">
                            <strong>
                                Cena: {item.price} PLN/
                                {item.availability.unitOfMeasure}
                            </strong>
                        </p>
                        <span className="card-available-quantity">
                            Dostępna ilość: {item.availability.availability}{" "}
                            {item.availability.unitOfMeasure}
                        </span>
                        <div className="buttons-container row d-flex align-items-center">
                            <ButtonInput
                                itemId={item.product.id}
                                availabaleItemQuantity={
                                    item.availability.availability
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="client-side">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 col-xl-10 offset-xl-0 order-lg-first order-last">
                        <div className="row card-container text-center mt-3">
                            {product}
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
