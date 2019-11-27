import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "../Button";
import NavMenu from "./ProductDetailsNavMenu";
import ClientPanelMenu from "../../ClientPanelMenu";
import Carousel from "./Carousel";

import "../../../assets/styles/product-details.scss";
//import { setProducts } from "../../../actions";

const ProductDetails = props => {
    const products = useSelector(state => state.cartReducer.items);
    const [loadedProduct, setLoadedProduct] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState();
    const id = props.match.params.id;
    const [productId, setProductId] = useState(id);
    //const [oldProductId, setOldProductdId] = useState(id);

    useEffect(() => {
        if (selectedIndex === products.length) {
            //setLoadedProduct(products[1]);
            products.map((product, i) => {
                return i === 0
                    ? setProductId(product.product.id) &&
                          setLoadedProduct(products[0])
                    : null;
            });
            props.history.push("/product/" + productId);
        }
        if (selectedIndex > 0 && selectedIndex < products.length) {
            return (
                setLoadedProduct(products[selectedIndex]),
                props.history.push("/product/" + productId)
            );
        } else {
            products.map((product, i) => {
                return product.product.id === id ? setSelectedIndex(i) : null;
            });
            return setLoadedProduct(products[selectedIndex]);
        }
    }, [loadedProduct, id, products, selectedIndex, productId, props.history]);

    const nexItem = () => {
        setSelectedIndex(selectedIndex + 1);
        products.map((product, i) => {
            return i === selectedIndex + 1
                ? setProductId(product.product.id)
                : null;
        });
        // if (Number(id) < products.length) {
        //     props.history.push("/product/" + (Number(id) + 1));
        // } else if (Number(id) === products.length) {
        //     props.history.push("/product/1");
        // }
    };
    const prevItem = () => {
        setSelectedIndex(selectedIndex - 1);
        products.map((product, i) => {
            return i === selectedIndex - 1
                ? setProductId(product.product.id)
                : null;
        });

        //  if (Number(id) === 1) {
        //      props.history.push("/product/" + products.length);
        //  } else {
        //      props.history.push("/product/" + (Number(id) - 1));
        //  }
    };

    let productAvailability;
    let productTitle;
    let productUnit;
    let productPrice;
    if (loadedProduct) {
        for (var key in loadedProduct.availability) {
            if (key === "availability") {
                productAvailability = loadedProduct.availability[key];
            }
            if (key === "unitOfMeasure") {
                productUnit = loadedProduct.availability[key];
            }
        }
        for (let key in loadedProduct.product) {
            if (key === "description1") {
                productTitle = loadedProduct.product[key];
            }
        }
        for (let key in loadedProduct) {
            if (key === "price") {
                productPrice = loadedProduct[key];
            }
        }
    }

    return (
        <div className="product-details">
            <div className="container-fluid">
                <NavMenu />
                <div className="row product-details-container">
                    <div className="col-md-9">
                        <div className="product-details-content row p-2">
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="d-flex justify-content-center">
                                    <Carousel
                                    //loadedProductImage={`/${loadedProduct.img}`}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{ maxWidth: "1000px" }}>
                                    <div className="product-details-desc p-3">
                                        <h3 className="product-details-header">
                                            {productTitle}
                                        </h3>
                                        <p className="product-details-text">
                                            {productTitle}
                                        </p>
                                        <p className="font-weight-bold">
                                            Kod produktu:{" "}
                                            <span className="product-details-text">
                                                WPK700
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Jednostka miary:{" "}
                                            <span className="product-details-text">
                                                {productUnit}
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Cena jednostkowa:{" "}
                                            <span className="product-details-text">
                                                {productPrice} zł
                                            </span>
                                        </p>
                                        <p className="font-weight-bold">
                                            Stan magazynowy:{" "}
                                            <span className="product-details-text">
                                                {productAvailability}{" "}
                                                {productUnit}
                                            </span>
                                        </p>
                                        <div className="product-buttons-container row">
                                            <Button
                                                itemId={productId}
                                                changeProduct={props}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={prevItem}
                                    >
                                        Poprzedni
                                    </button>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={nexItem}
                                    >
                                        Następny
                                    </button>
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
