import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientPanelMenu from "../ClientPanelMenu";
import ButtonInput from "./Button";
import Spinner from "../UI/Spinner/Spinner";
import { initProducts, nextPage, prevPage, setPage } from "../../actions/index";
import { times } from "lodash";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import defImg from "../../assets/images/default.jpg";

const ClientPanel = props => {
    const items = useSelector(state => state.cartReducer.items);
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const pagination = useSelector(state => state.cartReducer.pagination);
    const [currentItems] = useState(8);

    const dispatch = useDispatch();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        dispatch(initProducts(token, currentPage, currentItems));
    }, [dispatch, token, currentPage, currentItems]);

    let product = items
        ? items.map(item => {
              return (
                  <div
                      className="card border-secondary m-1 col-sm-6 col-lg-4"
                      key={item.product.id}
                  >
                      <Link to={`/product/${item.product.id}`}>
                          <div className="card-img d-flex align-items-center pt-3 px-3">
                              <div className="card-img-wrapper">
                                  <img
                                      className="card-img-content"
                                      src={item.img ? item.img : defImg}
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
                                      Cena: {item.price} PLN/
                                      {item.availability.unitOfMeasure}
                                  </strong>
                              </p>
                              <span className="card-available-quantity">
                                  Dostępna ilość:{" "}
                                  {item.availability.availability}{" "}
                                  {item.availability.unitOfMeasure}
                              </span>
                              <div className="buttons-container row d-flex align-items-center">
                                  <ButtonInput
                                      itemId={item.product.id}
                                      availabaleItemQuantity={
                                          item.availability.availability
                                      }
                                  />
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
    const pages = times(pagination.totalPages, Number);
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
                                className="w-100"
                            >
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                prevPageHandler(event)
                                            }
                                        >
                                            Poprzednia strona
                                        </button>
                                    </li>
                                    {pages.map(item => {
                                        item += 1;
                                        return (
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
                                        );
                                    })}
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={event =>
                                                nextPageHandler(event)
                                            }
                                        >
                                            Następna strona
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>
                    <div className="client-panel col-sm-12 col-lg-3 col-xl-2 order-lg-last order-first">
                        <ClientPanelMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPanel;
