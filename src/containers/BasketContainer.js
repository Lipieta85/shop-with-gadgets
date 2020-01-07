import React from "react";
import Basket from "../components/Basket/Basket";
import BasketSummary from "../components/Basket/BasketSummary";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import ClientPanelMenu from "../components/ClientPanelMenu";
import OrderOptions from "../components/Basket/OrderOptions";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../actions/index"; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/basket-container.scss";

const BasketContainer = () => {
    const dispatch = useDispatch();
    const addedItems = useSelector(state => state.cartReducer.addedItems);
    return (
        <div className="basket-container">
            <div className="container-fluid">
                <NavMenuClient />
                <div className="row basket-content">
                    <div className="cart-content col-sm-12 col-md-12 col-lg-9">
                        <div className="cart">
                            <ul className="cart-collection">
                                <h5 className="basket-header">
                                    {addedItems.length===0?
                                        "Koszyk jest pusty"
                                    :
                                        "Produkty aktualnie znajdujące się w koszyku:"
                                    }
                                </h5>
                                <div className="clear-button-box">
                                    {addedItems.length!==0  &&
                                        <Link to="/" className="pull-right clear-button unselectable" onClick={() => dispatch(clearBasket())}>
                                            Wyczyść koszyk <FontAwesomeIcon
                                                icon={faTimes}
                                                color="#a0a3a6"
                                                cursor="pointer"
                                                size="1x"
                                                className="icon-anim clear-icon"
                                            />
                                        </Link>
                                    }
                                </div>
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
