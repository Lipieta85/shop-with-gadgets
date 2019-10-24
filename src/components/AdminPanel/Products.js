import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/styles/products.scss";

const Products = () => {
    const items = useSelector(state => state.items);

    return (
        <div className="col-7 offset-md-2">
            <div className="container text-center">
                <div className="row text-center">
                    {items.map(item => (
                        <div
                            class="card m-1 col-sm-6 col-lg-4 border border-primary"
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
                            <div class="card-body pt-0 pb-3 px-3 p-1">
                                <h5 className="card-title mt-3 text-uppercase">
                                    {item.title}
                                </h5>
                                <p className="card-text">{item.desc}</p>
                                <p className="card-text">
                                    <strong>Cena: {item.price},00 zł</strong>
                                </p>
                                <button
                                    className="btn btn-outline-primary"
                                    // key={item.id}
                                    // to={"admin/products/" + item.id}
                                >
                                    Edytuj
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
