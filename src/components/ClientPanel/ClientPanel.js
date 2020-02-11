import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientPanelMenu from "../ClientPanelMenu";
import Spinner from "../UI/Spinner/Spinner";
import ScreenLock from "../ScreenLock";
import PolicyAcceptedModal from "./PolicyAcceptedModal";
import {
    initProducts,
    nextPage,
    prevPage,
    setPage,
    changeProductCategory,
    searchProductPanel,
    initProductsCategories,
} from "../../actions/index";
import "../../assets/styles/products.scss";
import "../../assets/styles/client-panel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Product from "./Product";
import Pager from "./Pager";
import { useTranslation } from "react-i18next";

const ClientPanel = props => {
    const items = useSelector(state => state.cartReducer.items);
    const currentPage = useSelector(state => state.pageReducer.currentPage);
    const pagination = useSelector(state => state.cartReducer.pagination);
    const category = useSelector(state => state.cartReducer.productsCategory);
    const [shortPagination, setShortPagination] = useState([2, 3, 4]);
    const [shortPagination2] = useState([2]);
    const [shortPagination3] = useState([2, 3]);
    const lang = useSelector(state => state.clientDataReducer.language);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    const [name, setName] = useState("");

    useEffect(() => {
        if (token && category === "1" && name === "") {
            setName("");
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
        //eslint-disable-next-line
    }, [currentPage, dispatch, token, category]);

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
    const handleChange = e => {
        setName(e.target.value);
    };
    const handleSearchBtn = e => {
        if (e.key === undefined || e.key === "Enter") {
            if (name === "") {
                dispatch(initProducts(token, currentPage));
            } else {
                dispatch(searchProductPanel(token, currentPage, lang, name));
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
                                            {t(`CPanelMenu.WyszukajProdukt`)}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="search-input submit_on_enter"
                                        onChange={handleChange}
                                        onKeyDown={handleSearchBtn}
                                        value={name}
                                        placeholder={t(
                                            `CPanelMenu.NazwaProduktu`,
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
                            {items && (
                                <Product
                                    items={items}
                                    pagination={pagination}
                                    currentPage={currentPage}
                                />
                            )}
                        </div>
                        <Spinner />
                        <PolicyAcceptedModal />>
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
