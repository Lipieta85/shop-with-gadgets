import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientPanelMenu from "../ClientPanelMenu";
import ButtonInput from "./Button";
import Spinner from "../UI/Spinner/Spinner";
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

    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

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

    let product = items
        ? items.map((item, i) => {
              return (
                  <div className="card-box col-6 col-md-4 col-xl-3">
                      <div className="card" key={item.product.id}>
                          {/* <div className="card-label-box">
                              <div className="card-label">Nowość</div>
                          </div> */}
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
                          <div className="card-body pt-0 pb-2 px-1">
                              <div
                                  className="card-title-container"
                                  style={{ minHeight: "50px" }}
                              >
                                  <h5 className="card-title text-uppercase">
                                      {item.product.description1}
                                  </h5>
                              </div>
                              <div>
                                  <p className="card-text">
                                      <strong>
                                          Cena: {item.price.price}{" "}
                                          {item.price.currency}/
                                          {item.product.uom_primary}
                                      </strong>
                                  </p>
                                  <span className="card-available-quantity">
                                      {item.availability===0?
                                        <span className="f-09 availability-alert">Niedostępny</span>
                                      :
                                        <>
                                            <span className="f-09">Dostępna ilość: {item.availability}{" "}{item.product.uom_primary}</span>
                                        </>
                                      }
                                  </span>
                                  <div className="buttons-container row d-flex align-items-center">
                                      <ButtonInput
                                          itemId={item.product.id}
                                          availabaleItemQuantity={
                                              item.availability
                                          }
                                          itemUnit={item.product.uom_primary}
                                          token={token}
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
            .querySelectorAll(".active")
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
                                                    ? "page-item active"
                                                    : "page-item"
                                            }
                                        >
                                            <button className="page-link">
                                                ...
                                            </button>
                                        </li>
                                    )}
                                    {shortPagination.map(item => {
                                        //item += 1;

                                        return (
                                            <>
                                                <li
                                                    className={
                                                        item === currentPage
                                                            ? "page-item active"
                                                            : "page-item"
                                                    }
                                                    key={item}
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
                                            </>
                                        );
                                    })}
                                    {currentPage <
                                        pagination.totalPages - 2 && (
                                        <li
                                            className={
                                                pagination.totalPages ===
                                                currentPage
                                                    ? "page-item active"
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
