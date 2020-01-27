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
        state => state.clientDataReducer.remainingBudget,
    );
    const currencyCode = useSelector(
        state => state.clientDataReducer.currencyCode,
    );
    const budgetHistory = useSelector(
        state => state.orderReducer.wixBudgetHistory.history,
    );
    const baseBudget = useSelector(state => state.clientDataReducer.baseBudget);
    const periodFrom = useSelector(state => state.clientDataReducer.periodFrom);
    function numberWithSpaces(num) {
        var parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const token = localStorage.getItem("token");
    useEffect(() => {
        dispatch(getClientBudgetHistory(token));
    }, [dispatch, token]);

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
                            {i.operation_type === "LOCK_ADD"
                                ? "blokada"
                                : i.operation_type === "LOCK_REMOVE"
                                ? "usunięcie blokady"
                                : i.operation_type === "BOOKING_ADD"
                                ? "księgowanie (finalne)"
                                : i.operation_type === "BOOKING_REMOVE"
                                ? "usunięcie księgowania"
                                : i.operation_type === "UPDATE_ADD"
                                ? "aktualizacja budżetu"
                                : i.operation_type === "UPDATE_REMOVE"
                                ? "usunięcie aktualizacji"
                                : ""}
                        </div>
                    </td>
                    <td>
                        <div className="cell">
                            {i.reference_id ? i.reference_id : "---"}
                        </div>
                    </td>
                    <td>
                        <div className="cell">
                            {numberWithSpaces((+i.operation_amount).toFixed(2))}{" "}
                            {currencyCode}
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
                                            Przyznany budżet marketingowy na rok{" "}
                                            {periodFrom.substr(0, 4)}:{" "}
                                            <strong>
                                                {numberWithSpaces(
                                                    baseBudget.toFixed(2),
                                                )}{" "}
                                                {currencyCode}
                                            </strong>{" "}
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
                                                        <th> Czas zdarzenia</th>
                                                        <th>Rodzaj operacji</th>
                                                        <th>
                                                            Numer zamówienia
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
                                            <div className="remainingBudgetTitle">
                                                Pozostały do wykorzystania
                                                budżet marketingowy na rok{" "}
                                                {periodFrom.substr(0, 4)}{" "}
                                                <strong>
                                                    {": "}
                                                    {numberWithSpaces(
                                                        remainingBudget,
                                                    )}{" "}
                                                    {currencyCode}
                                                </strong>
                                            </div>
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
