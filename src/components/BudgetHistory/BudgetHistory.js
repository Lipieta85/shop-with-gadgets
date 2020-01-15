import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClientBudgetHistory } from "../../actions/index";
import { Link } from "react-router-dom";
import "../../assets/styles/budget-history.scss";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import NavMenu from "../ClientPanel/ProductDetails/ProductDetailsNavMenu";

const BudgetHistory = () => {
    const remainingBudget = useSelector(
        state => state.orderReducer.wixBudgetHistory.remainingBudget,
    );
    const budgetHistory = useSelector(
        state => state.orderReducer.wixBudgetHistory.history,
    );

    const dispatch = useDispatch();

    const { t } = useTranslation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getClientBudgetHistory(token));
    }, [token, dispatch]);

    if (remainingBudget) {
        var budgetAtTheBeggining = parseFloat(remainingBudget.amount, 10);
        budgetHistory.map(
            i => (budgetAtTheBeggining -= parseFloat(i.operation_amount, 10)),
        );
    }

    let history;
    if (budgetHistory && remainingBudget) {
        history = budgetHistory
            .map((i, key) => (
                <tr>
                    <td>
                        <div className="cell">
                            {i.operation_entry_data_time}
                        </div>
                    </td>
                    <td>
                        <div className="cell">
                            {(+i.operation_amount).toFixed(2)}{" "}
                            {remainingBudget.currencyCode}
                        </div>
                    </td>
                </tr>
            ))
            .reverse();
    }
    return (
        <div className="budget-history">
            <div className="container-fluid p-5">
                <NavMenu />
                <div>
                    <div>
                        <h5>
                            {budgetHistory ? (
                                budgetHistory.length === 0 ? (
                                    <div>
                                        <h1 className="title">
                                            {t(
                                                "BudgetHistory.HistoriaBudżetuJestPusta",
                                            )}
                                        </h1>
                                        <Link
                                            to="/"
                                            className="btn btn-outline-primary mt-4"
                                        >
                                            {" "}
                                            {t("Basket.Wróć")}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="budgetTitles">
                                        <h2 className="titleBudgetHistory">
                                            {t("BudgetHistory.HistoriaBudżetu")}
                                        </h2>
                                        <div className="titleBudgetAtTheBegging">
                                            {t(
                                                "BudgetHistory.BudżetUżytkownikaNaPoczątku",
                                            )}
                                            :{" "}
                                            {(+budgetAtTheBeggining).toFixed(2)}{" "}
                                            {remainingBudget
                                                ? remainingBudget.currencyCode
                                                : ""}
                                        </div>
                                    </div>
                                )
                            ) : (
                                ""
                            )}
                            <div>
                                <div>
                                    {remainingBudget ? (
                                        <>
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <th>
                                                            {" "}
                                                            {t(
                                                                "BudgetHistory.Data",
                                                            )}
                                                        </th>
                                                        <th>
                                                            {t(
                                                                "BudgetHistory.WykorzystanyBudżet",
                                                            )}
                                                        </th>
                                                    </tr>
                                                    {history}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </h5>
                    </div>
                </div>
                <Spinner />
            </div>
        </div>
    );
};

export default BudgetHistory;
