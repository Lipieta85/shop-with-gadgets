import React, { useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector, useDispatch } from "react-redux";
import { getClientBudgetHistory } from "../../actions/index";
import { Link } from "react-router-dom";
import "../../assets/styles/budget-history.scss";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
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

    //zaokraglanie liczby do 2 miejsc po przecinku
    Math.decimal = function(n, k) {
        var factor = Math.pow(10, k + 1);
        n = Math.round(Math.round(n * factor) / 10);
        return n / (factor / 10);
    };

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
                            {Math.decimal(i.operation_amount, 2)}{" "}
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
                                    <h2 className="titleBudgetHistory">
                                        {t("BudgetHistory.HistoriaBudżetu")}
                                    </h2>
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
                            <div className="titleBudgetAtTheBegging">
                                {t("BudgetHistory.BudżetUżytkownikaNaPoczątku")}
                                : {Math.decimal(budgetAtTheBeggining, 2)}{" "}
                                {remainingBudget
                                    ? remainingBudget.currencyCode
                                    : ""}
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
