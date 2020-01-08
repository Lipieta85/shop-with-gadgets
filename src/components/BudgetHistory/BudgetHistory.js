import React, { useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import { useSelector, useDispatch } from "react-redux";
import { getClientBudgetHistory } from "../../actions/index";
import { Link } from "react-router-dom";
import "../../assets/styles/order-history.scss";
import Spinner from "../UI/Spinner/Spinner";

const BudgetHistory = () => {
    const remainingBudget = useSelector(
        state => state.orderReducer.wixBudgetHistory.remainingBudget,
    );
    const budgetHistory = useSelector(
        state => state.orderReducer.wixBudgetHistory.history,
    );

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getClientBudgetHistory(token));
    }, [token, dispatch]);

    return (
        <div className="order-history">
            <div className="container-fluid p-5">
                <NavMenu />
                <div className="row">
                    <div className="col-12">
                        <h4 className="order-list ml-1">
                            {budgetHistory ? (
                                budgetHistory.length === 0 ? (
                                    <>
                                        Pozostały dostępny budżet: {""}
                                        {remainingBudget.amount}{" "}
                                        {remainingBudget.currencyCode}
                                        <h2>Historia budżetu jest pusta</h2>
                                        <Link
                                            to="/"
                                            className="btn btn-outline-primary mt-4"
                                        >
                                            {" "}
                                            Wróć do sklepu
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Pozostały dostępny budżet: {""}
                                        {remainingBudget.amount}
                                        {""}
                                        {remainingBudget.currencyCode}
                                        {budgetHistory.map((i, key) => (
                                            <div key={key}>
                                                {i.operation_entry_data_time}{" "}
                                                {i.operation_amount}{" "}
                                                {remainingBudget.currencyCode}
                                            </div>
                                        ))}
                                    </>
                                )
                            ) : (
                                ""
                            )}
                        </h4>
                    </div>
                </div>
                <Spinner />
            </div>
        </div>
    );
};

export default BudgetHistory;
