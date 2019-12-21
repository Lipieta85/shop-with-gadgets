import React from "react";
import Basket from "../components/Basket/Basket";
import BasketSummary from "../components/Basket/BasketSummary";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import ClientPanelMenu from "../components/ClientPanelMenu";
import OrderOptions from "../components/Basket/OrderOptions";
import { useDispatch } from "react-redux";
import { clearBasket } from "../actions/index"; 
import { Link } from "react-router-dom";
import "../assets/styles/basket-container.scss";

const BasketContainer = () => {
    const dispatch = useDispatch();
    return (
        <div className="basket-container">
            <div className="container-fluid">
                <NavMenuClient />
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="basket-header">
                            Produkty aktualnie znajdujące się w koszyku:
                            <span className="clear-button-box"><Link to="/" className="btn pull-right clear-button" onClick={() => dispatch(clearBasket())} >Wyczyść koszyk</Link></span>
                        </h5>
                        
                    </div>
                </div>
                <div className="row basket-content">
                    <div className="cart-content col-sm-12 col-md-12 col-lg-9">
                        <div className="cart">
                            <ul className="cart-collection">
                                <Basket />
                                <BasketSummary />
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-3">
                        <div className="client-panel-menu">
                            <ClientPanelMenu />
                        </div>
                        <OrderOptions />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketContainer;
