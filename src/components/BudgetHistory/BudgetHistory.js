import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getClientBudgetHistory } from "../../actions/index";
import { getUserData } from "../../api/index";
import { Link } from "react-router-dom";
import "../../assets/styles/budget-history.scss";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import Separator from "../Separator/Separator";
import NavMenu from "../ClientPanel/ProductDetails/ProductDetailsNavMenu";
import ScreenLock from "../../components/ScreenLock";

const BudgetHistory = () => {
    const currencyCode = useSelector(
        state => state.clientDataReducer.currencyCode,
    );
    const budgetHistory = useSelector(
        state => state.orderReducer.wixBudgetHistory.history,
    );
    const baseBudget = useSelector(state => state.clientDataReducer.baseBudget);
    const periodFrom = useSelector(state => state.clientDataReducer.periodFrom);
    const aliasUserId = useSelector(
        state => state.clientDataReducer.aliasUserId,
    );
    const [remainingBudget, setRemainingBudget] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const token = localStorage.getItem("token");

    useEffect(() => {
        getUserData(token, aliasUserId).then(res => {
            setRemainingBudget(
                res.data.getWixClientData.budget.remainingBudget,
            );
        });
        dispatch(getClientBudgetHistory(token));
        //eslint-disable-next-line
    }, []);

    let history;
    if (budgetHistory && remainingBudget) {
        history = budgetHistory
            .map((i, key) => (
                i.reference_type==="ADMIN_CHANGE"&&i.operation_amount==="0.0000"?null: // only for WIX/Filtron
                <tr key={key}>
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
                            {" "}
                            {/**DO WYWALENIA ZARAZ */}
                            {i.operation_description
                                ? i.operation_description.includes(
                                      "Submitting of order",
                                  )
                                    ? "Złożenie zamówienia przez - " +
                                      i.operation_description.substr(34)
                                    : i.operation_description
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
                            {Separator((+i.operation_amount).toFixed(2))}{" "}
                            {currencyCode}
                        </div>
                    </td>
                </tr>
            ))
            .reverse();
    }
    return (
        <div className="budget-history">
            <div className="container-fluid ">
                <NavMenu />
                <div>
                    <div>
                        <h5>
                            {budgetHistory ? (
                                budgetHistory.length === 0 ? (
                                    <div>
                                        <h1 className="title">
                                            {t(
                                                "BudgetHistory.TheBudgetHistoryIsEmpty",
                                            )}
                                        </h1>
                                        <Link
                                            to="/"
                                            className="btn btn-outline-primary mt-4"
                                        >
                                            {" "}
                                            {t("Basket.RETURNTOTHESHOP")}
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="budgetTitles">
                                        <h2 className="titleBudgetHistory">
                                            {t("BudgetHistory.BudgetHistory")}
                                        </h2>
                                        <div className="titleBudgetAtTheBegging">
                                            {t("BudgetHistory.MarketingBudgetAllocatedForTheYear")}{" "}
                                            {periodFrom.substr(0, 4)}:{" "}
                                            <strong>
                                                {Separator(
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
                                                        <th>
                                                            {" "}
                                                            {t(
                                                                "BudgetHistory.Time",
                                                            )}
                                                        </th>
                                                        <th>
                                                            {t(
                                                                "BudgetHistory.OperationType",
                                                            )}
                                                        </th>
                                                        <th>
                                                            {t(
                                                                "BudgetHistory.OperationDescription",
                                                            )}
                                                        </th>
                                                        <th>
                                                            {t(
                                                                "BudgetHistory.OrderNumber",
                                                            )}
                                                        </th>
                                                        <th>
                                                            {t(
                                                                "BudgetHistory.UsedBudget",
                                                            )}
                                                        </th>
                                                    </tr>
                                                    {history}
                                                </tbody>
                                            </table>

                                            <div className="remainingBudgetTitle">
                                                {t(
                                                    "BudgetHistory.MarketingBudgetRemainingForTheYear",
                                                )}{" "}
                                                {periodFrom.substr(0, 4)}{" "}
                                                <strong>
                                                    {": "}
                                                    {Separator(
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
                <ScreenLock />
            </div>
        </div>
    );
};
export default BudgetHistory;
