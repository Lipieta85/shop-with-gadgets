import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { usePromiseTracker } from "react-promise-tracker";
import "../../assets/styles/order-end.scss";

const OrderEnd = () => {
    const orderState = useSelector(state => state.orderReducer.setOrderError);
    const orderNumber = useSelector(state => state.orderReducer.orderNumber);
    const [disabled, setDisabled] = useState(true);
    const { promiseInProgress } = usePromiseTracker();
    const { t } = useTranslation();
    const [confirmText, setConfirmText] = useState("",);
    let [loadingPercent, setLoadingPercent] = useState("1%");

    useEffect(() => {
        setTimeout(()=>{setLoadingPercent('12%');},100);setTimeout(()=>{setLoadingPercent('14%');},300)
        setTimeout(()=>{setLoadingPercent('38%');},400);setTimeout(()=>{setLoadingPercent('56%');},700);
        setTimeout(()=>{setLoadingPercent('60%');},900);setTimeout(()=>{setLoadingPercent('79%');},1200);
        setTimeout(()=>{setLoadingPercent('82%');},2000);setTimeout(()=>{setLoadingPercent('86%');},2300);
        setTimeout(()=>{setLoadingPercent('89%');},2800);setTimeout(()=>{setLoadingPercent('90%');},3200);
        setTimeout(()=>{setLoadingPercent('92%');},4000);setTimeout(()=>{setLoadingPercent('94%');},5000);
        setTimeout(()=>{setLoadingPercent('95%');},6000);setTimeout(()=>{setLoadingPercent('96%');},7200);
        setTimeout(()=>{setLoadingPercent('98%');},9000);setTimeout(()=>{setLoadingPercent('99%');},10000);
        if (promiseInProgress === true) {
            setConfirmText(<h3>{t("OrderEnd.PrzetwarzanieZamówienia")}</h3>)
        }
        if (orderState === false) {
            setConfirmText(
                <h3>
                    {t("OrderEnd.ZamówienieONr")} {orderNumber}{" "}
                    {t("OrderEnd.PrzekazaneDoRealizacji")}
                </h3>,
            );
        }

        if (orderState === true) {
            setConfirmText(<h3>{t("OrderEnd.BłądZamówienia")}</h3>);
            setDisabled(false);
        }
        if (orderNumber > 0) {
            setDisabled(false);
        }
    }, [orderState, orderNumber, t, promiseInProgress]);

    const disabledButton = () => {
        return disabled ? { display: "none" } : { display: "block" };
    };

    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                {confirmText}
                {promiseInProgress&&
                    <div className="loading-box mt-1">
                        <div className="loading-bar" style={{width:loadingPercent}}></div>
                        <div className="w-100 align-center loading-percent">{loadingPercent}</div>
                    </div>
                }
                <Spinner />

                <Link
                    to="/"
                    style={disabledButton()}
                    className="btn btn-outline-primary mt-4 w-25 mx-auto full-button"
                >
                    {" "}
                    {t("Basket.Wróć")}
                </Link>
            </div>
        </div>
    );
};

export default OrderEnd;
