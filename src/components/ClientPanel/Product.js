import React, { useEffect, useState } from "react";
import ButtonInput from "./Button";
import { Link } from "react-router-dom";
import defImg from "../../assets/images/default.jpg";
import { useTranslation } from "react-i18next";

const Product = ({ items, pagination, currentPage }) => {
    const token = localStorage.getItem("token");
    const { t } = useTranslation();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (items.length > pagination.itemsPerPage && currentPage === 1) {
            const firstElem = currentPage - 1;
            const lastElem = pagination.itemsPerPage;
            const currProducts = items.slice(firstElem, lastElem);

            setProducts(currProducts);
        }

        if (items.length > pagination.itemsPerPage && currentPage > 1) {
            const firstElem =
                pagination.itemsPerPage * currentPage - pagination.itemsPerPage;
            const lastElem = firstElem + pagination.itemsPerPage;
            const currProducts = items.slice(firstElem, lastElem);

            setProducts(currProducts);
        }

        if (items.length === pagination.itemsPerPage) {
            setProducts(items);
        }
        //eslint-disable-next-line
    }, [items, currentPage]);

    return products.map((item, i) => {
        return (
            <div
                className="card-box col-6 col-md-4 col-xl-3"
                key={item.product.id}
            >
                <div className="card">
                    {item.extraTag ? (
                        <>
                            <div className="card-label-box">
                                <div className="card-label">
                                    <div
                                        className="label-textarea unselectable"
                                        style={{
                                            fontSize:
                                                item.extraTag.length > 12
                                                    ? "8.4px"
                                                    : "",
                                        }}
                                    >
                                        {item.extraTag}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    <Link to={`/product/${item.product.id}`}>
                        <div className="card-img d-flex align-items-center pt-3 px-3">
                            <div className="card-img-wrapper">
                                <img
                                    className="card-img-content"
                                    src={
                                        item.images.length
                                            ? item.images[0].small
                                            : defImg
                                    }
                                    alt="Card-cap"
                                ></img>
                            </div>
                        </div>
                    </Link>
                    <hr />
                    <div className="card-body pt-0 pb-0 px-0">
                        <div
                            className="card-title-container"
                            style={{ minHeight: "50px" }}
                        >
                            <Link to={`/product/${item.product.id}`}>
                                <h5 className="card-title text-uppercase">
                                    {item.product.name}
                                </h5>
                            </Link>
                        </div>
                        <div>
                            <p className="card-text">
                                <strong>
                                    {t(`Card.Cena`)}:{" "}
                                    {(+item.price.price).toFixed(2)}{" "}
                                    {item.price.currency}/
                                    {item.product.unitOfMeasure}
                                </strong>
                            </p>
                            {item.availability === 0 ? (
                                <div className="card-available-quantity pb-2">
                                    <span className="quantity">
                                        {t(`Card.Niedostępny`)}
                                    </span>
                                </div>
                            ) : (
                                <div className="card-available-quantity pb-1">
                                    <span className="quantity m-desktop">
                                        {t(`Card.DostępnaIlość`)}:{" "}
                                        {item.availability}{" "}
                                        {item.product.unitOfMeasure}
                                    </span>
                                    <span className="quantity m-mobile">
                                        {t(`Card.Dostępnych`)}:{" "}
                                        {item.availability}{" "}
                                        {item.product.unitOfMeasure}
                                    </span>
                                </div>
                            )}
                            <div className="buttons-container row d-flex align-items-center mt-2">
                                <ButtonInput
                                    itemId={item.product.id}
                                    availabaleItemQuantity={item.availability}
                                    itemUnit={item.product.unitOfMeasure}
                                    itemTitle={item.product.name}
                                    token={token}
                                    price={item.price.price}
                                    currency={item.price.currency}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

export default Product;
