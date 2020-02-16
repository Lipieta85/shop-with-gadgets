import React from "react";
import Basket from "../components/Basket/Basket";
import BasketSummary from "../components/Basket/BasketSummary";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import ClientPanelMenu from "../components/ClientPanelMenu";
import OrderOptions from "../components/Basket/OrderOptions";
import { useDispatch, useSelector } from "react-redux";
import { changeDeleteAllProductsModalState } from "../actions/index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/basket-container.scss";

const BasketContainer = () => {
    const dispatch = useDispatch();
    const addedItems = useSelector(state => state.cartReducer.addedItems);
    const { t } = useTranslation();
    return (
        <div className="basket-container">
            <div className="container-fluid">
                <NavMenuClient />
                <div className="row basket-content">
                    <div className="cart-content col-sm-12 col-md-12 col-lg-9">
                        <div className="cart">
                            <ul className="cart-collection">
                                <h5 className="basket-header">
                                    {addedItems.length === 0 ? (
                                        <div>
                                            {" "}
                                            <div className="order-end text-center">
                                                <div className="order-end-box p-4">
                                                    <h5>
                                                        {t(
                                                            "Basket.BrakProduktów",
                                                        )}
                                                    </h5>
                                                    <Link
                                                        to="/"
                                                        className="btn btn-outline-primary mt-2"
                                                    >
                                                        {" "}
                                                        {t("Basket.Wróć")}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        `${t("Basket.ProduktyWKoszyku")}`
                                    )}
                                </h5>
                                <div className="clear-button-box">
                                    {addedItems.length !== 0 && (
                                        <span
                                            className="pull-right clear-button unselectable"
                                            onClick={() =>
                                                dispatch(
                                                    changeDeleteAllProductsModalState(
                                                        true,
                                                    ),
                                                )
                                            }
                                        >
                                            {t(`Basket.Wyczyść`)}{" "}
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                color="#a0a3a6"
                                                cursor="pointer"
                                                size="1x"
                                                className="icon-anim clear-icon"
                                            />
                                        </span>
                                    )}
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
                        {addedItems.length === 0 ? "" : <OrderOptions />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketContainer;
