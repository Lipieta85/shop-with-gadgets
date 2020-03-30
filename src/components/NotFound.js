import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "../assets/styles/order-end.scss";
import { signOut } from "../actions/authorization";
import host from "../api/host";

export default function NotFound() {
    const dispatch = useDispatch();
    const link = `${host}/site/desktop`;
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(signOut());
    }, [dispatch]);
    
    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>{t("NotFound.AuthDataExpired")}</h3>
                <a className="btn btn-outline-primary mt-4" href={link}>
                    {t("NotFound.GoToLog")}
                </a>
            </div>
        </div>
    );
}
