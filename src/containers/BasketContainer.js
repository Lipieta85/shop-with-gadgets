import React from "react";
import Basket from "../components/Basket/Basket";
import BasketSummary from "../components/Basket/BasketSummary";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import ClientPanelMenu from "../components/ClientPanelMenu";
import OrderOptions from "../components/Basket/OrderOptions";
import "../assets/styles/basket-container.scss";

const BasketContainer = () => {
    return (
        <div className="basket-container">
            <div className="container-fluid">
                <NavMenuClient />
                <div className="row">
                    <div className="cart-content order-last col-sm-12 order-sm-last col-md-12 order-md-last col-lg-9 order-lg-first">
                        <div className="cart">
                            <h5 className="basket-header ml-4">
                                Twoje produkty znajdujące się aktualnie w
                                koszyku:
                            </h5>
                            <ul className="collection">
                                <Basket />
                                <BasketSummary />
                            </ul>
                        </div>
                    </div>
                    <div className="order-first col-sm-12 order-sm-first col-md-12 order-md-first col-lg-3 order-lg-last">
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
