import React from "react";
import { Link } from "react-router-dom";
export default function Pagination(props) {
    /**
     * variables definition:
     * total - count of total items
     * pathname - name of link /{pathname}/:id
     * itemsOnPage - count of displayed item on each page
     * page - id of page /{pathname}/:{page}
     * pages - count of pages
     */
    const { total, pathname, itemsOnPage, page } = props;
    const pages = Math.ceil(total / itemsOnPage);
    const pagination = () => {
        let links = [];
        if (pages > 4 && page > 1) {
            links.unshift(
                <li key={0} className="page-item">
                    <Link className="page-link" to={`/${pathname}/${page - 1}`}>
                        <i className="fa fa-angle-left" />
                    </Link>
                </li>,
            );
        }
        for (let index = 0; index < pages; index++) {
            if (index < page + 1 && index > page - 3) {
                links.push(
                    <li
                        key={links.length}
                        className={
                            index === page - 1
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <Link
                            className="page-link"
                            to={`/${pathname}/${index + 1}`}
                        >
                            {index + 1}
                        </Link>
                    </li>,
                );
            }
        }
        if (page < pages) {
            links.push(
                <li key={links.length} className="page-item">
                    <Link className="page-link" to={`/${pathname}/${page + 1}`}>
                        <i className="fa fa-angle-right" />
                    </Link>
                </li>,
            );
        }
        return links;
    };
    return (
        <ul className="pagination">
            <li className="page-item">
                <Link className="page-link" to={`/${pathname}/1`}>
                    <i className="fa fa-angle-double-left" />
                </Link>
            </li>
            {pagination()}
            <li className="page-item">
                <Link className="page-link" to={`/${pathname}/${pages}`}>
                    <i className="fa fa-angle-double-right" />
                </Link>
            </li>
        </ul>
    );
}
