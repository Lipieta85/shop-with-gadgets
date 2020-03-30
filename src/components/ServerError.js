import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/order-end.scss";
import { useTranslation } from "react-i18next";
import { signOut } from "../actions/authorization";
import host from "../api/host";

export default function ServerError() {
    const errorText = useSelector(state => state.cartReducer.error)
    const dispatch = useDispatch();
    const link = `${host}/site/desktop`;
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(signOut());
    }, [dispatch]);
    
    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>{t("NotFound.ServerError")}</h3>
                <p>{errorText}</p>
                <a className="btn btn-outline-primary mt-4" href={link}>
                    {t("NotFound.GoToLog")}
                </a>
            </div>
        </div>
    );
}
