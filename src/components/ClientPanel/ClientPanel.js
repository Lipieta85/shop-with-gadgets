import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientPanelMenu from "../ClientPanelMenu";
import Spinner from "../UI/Spinner/Spinner";
import ScreenLock from "../ScreenLock";
import {
    initProducts,
    nextPage,
    prevPage,
    setPage,
    changeProductCategory,
} from "../../actions/index";

import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";

import Product from "./Product";
import Pager from "./Pager";

const ClientPanel = props => {
    const items = useSelector(state => state.cartReducer.items);
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const pagination = useSelector(state => state.cartReducer.pagination);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const [shortPagination, setShortPagination] = useState([2, 3, 4]);

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && category === "1") {
            dispatch(initProducts(token, currentPage));
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
        //eslint-disable-next-line
    }, [currentPage, token]);

    useEffect(() => {
        if (category !== "1") {
            dispatch(changeProductCategory(token, category, currentPage));
        }
        //eslint-disable-next-line
    }, [category, dispatch, token]);

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

    return (
        <div className="client-side">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 col-xl-10 offset-xl-0 order-lg-first order-last">
                        <div className="row card-container text-center mt-3">
                            {items && (
                                <Product
                                    items={items}
                                    pagination={pagination}
                                    currentPage={currentPage}
                                />
                            )}
                        </div>
                        <Spinner />
                        <ScreenLock />
                        <Pager
                            pagination={pagination}
                            currentPage={currentPage}
                            prevPageHandler={prevPageHandler}
                            pageHandler={pageHandler}
                            nextPageHandler={nextPageHandler}
                            shortPagination={shortPagination}
                        />
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
