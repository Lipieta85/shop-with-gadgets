import React from "react";
import "../../assets/styles/products.scss";
import "../../assets/styles/products2.scss";
import { useSelector, useDispatch } from "react-redux";
import { addItemToBasket } from "../../actions/actions";

const Products2 = () => {
    const items = useSelector(state => state.items);
    const priceValue = useSelector(state => state.total);

    const dispatch = useDispatch();

    return (
        <div className="client-side">
            <div className="container-fluid" style={{ marginTop: "80px" }}>
                <div className="row">
                    <div className="col-7 offset-md-2">
                        <div className="container text-center">
                            <div className="row text-center">
                                {items.map(item => (
                                    <div class="card border-primary m-1 col-sm-6 col-lg-4">
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
                                        <div class="card-body pt-0 pb-3 px-3 p-1">
                                            <h5 className="card-title mt-3 text-uppercase">
                                                {item.title}
                                            </h5>
                                            <p className="card-text">
                                                {item.desc}
                                            </p>
                                            <p className="card-text">
                                                <strong>
                                                    Cena: {item.price}zł
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
                    <div className="col-3">
                        <div className="admin-panel">
                            <div className="admin-panel__logged-panel">
                                <h4 className="logged-panel-header">
                                    Witaj Rafał
                                </h4>
                                <div className="logged-panel-btn-group">
                                    <div className="btn-left">
                                        <a
                                            href="/"
                                            className="btn btn-outline-primary left-btn"
                                            role="button"
                                        >
                                            Edycja konta >
                                        </a>
                                    </div>
                                    <div className="btn-right">
                                        <a
                                            href="/"
                                            className="btn btn-outline-primary right-btn"
                                            role="button"
                                        >
                                            Wyloguj >
                                        </a>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="logged-panel__purchase-value">
                                    <p className="purchase-text">
                                        <span className="purchase-header">
                                            Wartość twoich zakupów
                                        </span>
                                        <br />
                                        <span className="value">
                                            {priceValue}zł
                                        </span>
                                        <br />
                                        <span className="purchase-header">
                                            Premia za wzrost zakupowy
                                        </span>
                                        <br />
                                        <span className="value">0,00</span>
                                    </p>
                                </div>
                                <div className="divider"></div>
                                <div className="logged-panel__activity">
                                    <p>
                                        Liczba aktywności specjlanych z Twoim
                                        udziałem: 1
                                    </p>
                                </div>
                                <div className="divider"></div>
                                <div className="logged-panel__status">
                                    <p>
                                        <span>Twój status: </span>
                                        <br />
                                        Masz jeszcze czas, by przekroczyć
                                        minimalny próg zakupowy wysokości 500 zł
                                        i swoją przygodę w FILTRON BENEFIT
                                        PROGRAM 2019 zamienić na prawdziwe
                                        nagrody! Nie zwlekaj - trzymamy kciuki i
                                        życzymy powodzenia!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
    );
};

export default Products2;
