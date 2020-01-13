import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import defImg from "../../../assets/images/default.jpg";
import Button from "../Button";
import NavMenu from "./ProductDetailsNavMenu";
import ClientPanelMenu from "../../ClientPanelMenu";
import Carousel from "./Carousel";
import Spinner from "../../UI/Spinner/Spinner";
import { Link } from "react-router-dom";
import "../../../assets/styles/product-details.scss";

const ProductDetails = props => {
    const products = useSelector(state => state.cartReducer.items);
    const pagination = useSelector(state => state.cartReducer.pagination);
    const [loadedProduct, setLoadedProduct] = useState();
    const [selectedIndex, setSelectedIndex] = useState();
    const id = props.match.params.id;
    const [productId, setProductId] = useState(id);

    useEffect(() => {
        if (selectedIndex >= 0 && selectedIndex < products.length) {
            return setLoadedProduct(products[selectedIndex]);
        }
        if (!selectedIndex) {
            products.map((product, i) => {
                return product.product.id === id ? setSelectedIndex(i) : null;
            });
            return setLoadedProduct(products[selectedIndex]);
        }
    }, [
        loadedProduct,
        id,
        selectedIndex,
        productId,
        props.history,
        pagination.totalPages,
        products,
    ]);

    const nexItem = () => {
        setSelectedIndex(prevState => prevState + 1);
        products.map((product, i) => {
            return i === selectedIndex + 1
                ? setProductId(product.product.id)
                : null;
        });
        if (selectedIndex + 1 === products.length) {
            setLoadedProduct(products[0]);
            setSelectedIndex(0);
            products.map((product, i) => {
                return i === 0 ? setProductId(product.product.id) : null;
            });
        }
        props.history.push("/product/" + productId);
    };
    const prevItem = () => {
        setSelectedIndex(prevState => prevState - 1);
        products.map((product, i) => {
            return i === selectedIndex - 1
                ? setProductId(product.product.id)
                : null;
        });
        if (selectedIndex - 1 === -1) {
            setLoadedProduct(products[products.length - 1]);
            setSelectedIndex(products.length - 1);
            products.map((product, i) => {
                return i === products.length - 1
                    ? setProductId(product.product.id)
                    : null;
            });
        }
        props.history.push("/product/" + productId);
    };

    let productAvailability,
        productTitle,
        productUnit,
        productPrice,
        productCurrency,
        productCode,
        productPhoto,
        productPhoto2,
        productPhoto3;

    if (loadedProduct) {
        productAvailability = loadedProduct.availability;
        productTitle = loadedProduct.product.description1;
        productUnit = loadedProduct.product.uom_primary;
        productPrice = loadedProduct.price.price;
        productCurrency = loadedProduct.price.currency;
        productCode = loadedProduct.product.second_item_number;

        if (typeof loadedProduct.images[0] != "undefined") {
            productPhoto = loadedProduct.images[0].medium;
        }
        if (typeof loadedProduct.images[1] != "undefined") {
            productPhoto2 = loadedProduct.images[1].medium;
        }
        if (typeof loadedProduct.images[2] != "undefined") {
            productPhoto3 = loadedProduct.images[2].medium;
        }
    }

    return (
        <div className="product-details">
            <div className="container-fluid">
                <NavMenu />
                <Spinner />
                <div className="row product-details-container">
                    <div className="col-md-9 col-xl-10">
                        <div className="product-details-content row p-2">
                            <div className="col-md-6 d-flex justify-content-center">
                                <div className="d-flex justify-content-center">
                                    <Carousel
                                        loadedProductImage={
                                            productPhoto ? productPhoto : defImg
                                        }
                                        loadedProductImage2={productPhoto2}
                                        loadedProductImage3={productPhoto3}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{ maxWidth: "1000px" }}>
                                    <div className="product-details-desc p-3">
                                        <h3 className="product-details-header">
                                            {productTitle}
                                        </h3>
                                        <p className="font-weight-bold">
                                            Kod produktu:{" "}
                                            <span className="product-details-text">
                                                {productCode}
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
                                                {productPrice} {productCurrency}
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
                                                availabaleItemQuantity={
                                                    productAvailability
                                                }
                                                itemUnit={productUnit}
                                                changeProduct={props}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="navButtons">
                                    <div className="mt-3 row m-0">
                                        <div className="col-4 p-0">
                                            <Link
                                                className="btn btn-outline-primary"
                                                to="/"
                                            >
                                                Powrót
                                            </Link>
                                        </div>
                                        <div className="col-8 p-0 right-buttons">
                                            <button
                                                className="btn btn-outline-primary btn-prev"
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
                        </div>
                    </div>
                    <div className="client-panel col-md-3 col-xl-2">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
