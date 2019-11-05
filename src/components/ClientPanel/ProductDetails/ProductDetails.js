import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "../Button";
import NavMenu from "./ProductDetailsNavMenu";
import ClientPanelMenu from "../../ClientPanelMenu";

import "../../../assets/styles/product-details.scss";

const ProductDetails = props => {
    const products = useSelector(state => state.items);
    const [loadedProduct, setLoadedProduct] = useState([]);
    const id = props.match.params.id;

    useEffect(() => {
        if (id) {
            if (!loadedProduct || (loadedProduct && loadedProduct.id !== id)) {
                const filter = products.filter(product => {
                    return product.id === id;
                });
                setLoadedProduct(filter[0]);
            }
        }
    }, [loadedProduct, products, id]);

    return (
        <div className="product-details">
            <div className="container-fluid">
                <NavMenu />
                <div className="row product-details-container">
                    <div className="col-md-9">
                        <div className="product-details-content row">
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="d-flex justify-content-center">
                                    <img
                                        src={loadedProduct.img}
                                        className="product-detail-image w-100"
                                        alt="product"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mt-4">
                                <div style={{ maxWidth: "1000px" }}>
                                    <div className="product-details-desc border border-primary p-3">
                                        <h3 className="product-details-header">
                                            {loadedProduct.title}
                                        </h3>
                                        <p className="product-details-text">
                                            {loadedProduct.desc}
                                        </p>
                                        <p className="font-weight-bold text-uppercase">
                                            Kod produktu:{" "}
                                            <span className="product-details-text">
                                                WPK700
                                            </span>
                                        </p>
                                        <p className="font-weight-bold text-uppercase">
                                            Jednostka miary:{" "}
                                            <span className="product-details-text">
                                                szt
                                            </span>
                                        </p>
                                        <p className="font-weight-bold text-uppercase">
                                            Cena jendostkowa:{" "}
                                            <span className="product-details-text">
                                                {loadedProduct.price} zł
                                            </span>
                                        </p>
                                        <p className="font-weight-bold text-uppercase">
                                            Stan magazynowy:{" "}
                                            <span className="product-details-text">
                                                100
                                            </span>
                                        </p>
                                        <div className="product-buttons-container row">
                                            <Button itemId={id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="client-panel col-md-3">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
