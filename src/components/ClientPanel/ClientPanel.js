import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientPanelMenu from "../ClientPanelMenu";
import ButtonInput from "./Button";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import {
    initProducts,
    nextPage,
    prevPage,
    setPage,
    initProductsCategories,
    changeProductCategory,
} from "../../actions/index";

import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import defImg from "../../assets/images/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const ClientPanel = props => {
    const items = useSelector(state => state.cartReducer.items);
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const pagination = useSelector(state => state.cartReducer.pagination);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const [shortPagination, setShortPagination] = useState([2, 3, 4]);
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && category === "1") {
            dispatch(initProducts(token, currentPage));
            dispatch(initProductsCategories(token));
            if (currentPage < 3) {
                setShortPagination([2, 3, 4]);
            } else if (currentPage > pagination.totalPages - 3) {
                setShortPagination([
                    pagination.totalPages - 3,
                    pagination.totalPages - 2,
                    pagination.totalPages - 1,
                ]);
            } else {
                setShortPagination([
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                ]);
            }
        }
    }, [currentPage, dispatch, pagination.totalPages, token, category]);

    useEffect(() => {
        if (category !== "1") {
            dispatch(changeProductCategory(token, category));
        }
    }, [category, dispatch, token]);

    // useEffect(() => {
    //     if (category !== "1") { 
    //         return window.location.replace(`${host2}/404`)
    //     }
    // }, [])

    let product = items
        ? items.map((item, i) => {
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
                                          <div className="label-textarea unselectable"
                                            style={{fontSize:item.extraTag.length>12?'8.4px':''}}
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
                                          {t(`Card.Cena`)}: {(+item.price.price).toFixed(2)}{" "}
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
                                          availabaleItemQuantity={
                                              item.availability
                                          }
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
          })
        : null;

    const nextPageHandler = () => {
        if (currentPage < pagination.totalPages) {
            dispatch(nextPage());
        } else {
            dispatch(setPage(1));
        }
    };
    const prevPageHandler = () => {
        if (currentPage > 1) {
            dispatch(prevPage());
        } else {
            dispatch(setPage(pagination.totalPages));
        }
    };
    const pageHandler = event => {
        dispatch(setPage(Number(event.target.innerText)));
        document
            .querySelectorAll(".pagination .active")
            .forEach(item => item.classList.remove("active"));
        event.target.parentNode.classList.add("active");
    };
    // const pages = times(pagination.totalPages, Number);
    //const pages = [...shortPagination, ...firstLastPages].sort((a, b) => a - b);

    return (
        <div className="client-side">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 col-xl-10 offset-xl-0 order-lg-first order-last">
                        <div className="row card-container text-center mt-3">
                            {product}
                        </div>
                        <Spinner />
                        {pagination.totalPages > 1 && (
                            <nav
                                aria-label="navigation align-items-bottom"
                                className="w-100 navigation-pager"
                            >
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                prevPageHandler(event)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleDoubleLeft}
                                                color="#a0a3a6"
                                                cursor="pointer"
                                            />
                                        </button>
                                    </li>

                                    <li
                                        className={
                                            1 === currentPage
                                                ? "page-item active"
                                                : "page-item"
                                        }
                                    >
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                pageHandler(event)
                                            }
                                        >
                                            1
                                        </button>
                                    </li>
                                    {currentPage > 3 && (
                                        <li
                                            className={
                                                pagination.totalPages ===
                                                currentPage
                                                    ? "page-item"
                                                    : "page-item"
                                            }
                                        >
                                            <button className="page-link">
                                                ...
                                            </button>
                                        </li>
                                    )}
                                    {pagination.totalPages > 4&&shortPagination.map((item,i) => {
                                        //item += 1;

                                        return (
                                                <li
                                                    className={
                                                        item === currentPage
                                                            ? "page-item active"
                                                            : "page-item"
                                                    }
                                                    key={i}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={event =>
                                                            pageHandler(event)
                                                        }
                                                    >
                                                        {item}
                                                    </button>
                                                </li>
                                        );
                                    })}
                                    {currentPage <
                                        pagination.totalPages - 2 && (
                                        <li
                                            className={
                                                pagination.totalPages ===
                                                currentPage
                                                    ? "page-item"
                                                    : "page-item"
                                            }
                                        >
                                            <button className="page-link">
                                                ...
                                            </button>
                                        </li>
                                    )}
                                    <li
                                        className={
                                            pagination.totalPages ===
                                            currentPage
                                                ? "page-item active"
                                                : "page-item"
                                        }
                                    >
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                pageHandler(event)
                                            }
                                        >
                                            {pagination.totalPages}
                                        </button>
                                    </li>
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                nextPageHandler(event)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faAngleDoubleRight}
                                                color="#a0a3a6"
                                                cursor="pointer"
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                    <div className="client-panel cp-parent col-sm-12 col-lg-3 col-xl-2 order-lg-last order-first">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPanel;
