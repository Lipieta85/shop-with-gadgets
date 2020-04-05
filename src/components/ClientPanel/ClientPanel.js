import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientPanelMenu from "../ClientPanelMenu";
import Spinner from "../UI/Spinner/Spinner";
import ScreenLock from "../ScreenLock";
import PolicyAcceptedModal from "./modals/PolicyAcceptedModal";
import {
    initProducts,
    nextPage,
    prevPage,
    changeProductCategory,
    searchProductPanel,
    paginationType,
    setPage,
    setProductCategories,
    setSearchText,
} from "../../actions/index";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Product from "./Product";
import Pager from "./Pager";
import { useTranslation } from "react-i18next";
import AddProductModal from "./modals/AddProductModal";

const ClientPanel = props => {
    const items = useSelector(state => state.cartReducer.items);
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    let pagination = useSelector(state => state.cartReducer.pagination);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const paginationTyp = useSelector(
        state => state.cartReducer.paginationType,
    );
    const lang = useSelector(state => state.clientDataReducer.language);
    const searchText = useSelector(
        state => state.searchPanelReducer.searchText,
    );
    const [shortPagination, setShortPagination] = useState([2, 3, 4]);
    const [shortPagination2] = useState([2]);
    const [shortPagination3] = useState([2, 3]);
    const [activePage, setActivePage] = useState(0);

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { t } = useTranslation();

    useEffect(() => {
        setActivePage(0);
    }, []);
    
    useEffect(() => {
        if (token && category === "1" && paginationTyp === "back") {
            if (Number(activePage) === currentPage) {
                dispatch(initProducts(token, currentPage));
            }
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
    }, [category, currentPage]);

    useEffect(() => {
        if (token && paginationTyp === "front") {
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
        if (currentPage > pagination.totalPages) {
            dispatch(setPage(1));
        }
        //eslint-disable-next-line
    }, [currentPage, pagination]);

    useEffect(() => {
        if (category !== "1") {
            dispatch(changeProductCategory(token, category, currentPage));
        }
        //eslint-disable-next-line
    }, [category, dispatch]);

    const nextPageHandler = () => {
        if (currentPage < pagination.totalPages) {
            dispatch(nextPage());
            setActivePage(currentPage + 1);
        } else {
            dispatch(setPage(1));
            setActivePage(1);
        }
    };
    const prevPageHandler = () => {
        if (currentPage > 1) {
            dispatch(prevPage());
            setActivePage(currentPage - 1);
        } else {
            dispatch(setPage(pagination.totalPages));
            setActivePage(pagination.totalPages);
        }
    };
    const pageHandler = event => {
        dispatch(setPage(Number(event.target.innerText)));
        setActivePage(event.target.innerText);
        document
            .querySelectorAll(".pagination .active")
            .forEach(item => item.classList.remove("active"));
        event.target.parentNode.classList.add("active");
    };
    const handleChange = e => {
        dispatch(setSearchText(e.target.value));
    };
    const handleSearchBtn = e => {
        if (e.key === undefined || e.key === "Enter") {
            dispatch(setProductCategories("1"));
            if (searchText === "") {
                dispatch(initProducts(token, currentPage));
            } else {
                dispatch(paginationType("front"));
                dispatch(searchProductPanel(token, 1, lang, searchText));
            }
        }
    };
    return (
        <div className="client-side">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-lg-9 col-xl-10 offset-xl-0 order-lg-first order-last">
                        <div className="search-panel row">
                            <div className="panel-right col-12 col-sm-10">
                                <div className="search-box">
                                    <div className="panel-left m-desktop-flex">
                                        <span>
                                            {t(`CPanelMenu.FindTheProduct`)}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="search-input"
                                        onChange={handleChange}
                                        onKeyDown={handleSearchBtn}
                                        value={searchText}
                                        placeholder={t(
                                            `CPanelMenu.ProductName`,
                                        )}
                                    ></input>
                                    <button
                                        className="search-button"
                                        onClick={handleSearchBtn}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            size="1x"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row card-container text-center mt-1">
                            {items && pagination && (
                                <Product
                                    items={items}
                                    pagination={pagination}
                                    currentPage={currentPage}
                                />
                            )}
                        </div>
                        <Spinner />
                        <PolicyAcceptedModal />
                        <ScreenLock />
                        <Pager
                            pagination={pagination}
                            currentPage={currentPage}
                            prevPageHandler={prevPageHandler}
                            pageHandler={pageHandler}
                            nextPageHandler={nextPageHandler}
                            shortPagination={shortPagination}
                            shortPagination2={shortPagination2}
                            shortPagination3={shortPagination3}
                        />
                        <AddProductModal />
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
