import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const Pager = ({
    pagination,
    currentPage,
    prevPageHandler,
    pageHandler,
    nextPageHandler,
    shortPagination,
}) => {
    return (
        pagination.totalPages > 1 && (
            <nav
                aria-label="navigation align-items-bottom"
                className="w-100 navigation-pager"
            >
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={event => prevPageHandler(event)}
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
                            1 === currentPage ? "page-item active" : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={event => pageHandler(event)}
                        >
                            1
                        </button>
                    </li>
                    {currentPage > 3 && (
                        <li
                            className={
                                pagination.totalPages === currentPage
                                    ? "page-item"
                                    : "page-item"
                            }
                        >
                            <button className="page-link">...</button>
                        </li>
                    )}
                    {pagination.totalPages > 4 &&
                        shortPagination.map((item, i) => {
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
                                        onClick={event => pageHandler(event)}
                                    >
                                        {item}
                                    </button>
                                </li>
                            );
                        })}
                    {currentPage < pagination.totalPages - 2 && (
                        <li
                            className={
                                pagination.totalPages === currentPage
                                    ? "page-item"
                                    : "page-item"
                            }
                        >
                            <button className="page-link">...</button>
                        </li>
                    )}
                    <li
                        className={
                            pagination.totalPages === currentPage
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={event => pageHandler(event)}
                        >
                            {pagination.totalPages}
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={event => nextPageHandler(event)}
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
        )
    );
};

export default Pager;
