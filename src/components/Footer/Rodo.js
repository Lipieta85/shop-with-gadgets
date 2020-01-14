import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/rodo.scss";
import { getRodoPolicy } from "./../../api/index";
import Spinner from "./../UI/Spinner/Spinner";
import { useTranslation } from "react-i18next";
const Rodo = () => {
    const [rodo, setRodo] = useState("");
    const token = localStorage.getItem("token");
    const { t } = useTranslation();
    useEffect(() => {
        getRodoPolicy(token).then(res => {
            setRodo(res.data.data.objects);
        });
    }, [token]);

    return (
        <div className="rodo">
            <NavMenu /> <h2>{t(`Footer.RODO`)}</h2>
            {rodo ? (
                rodo.map((e, key) => (
                    <div id="rodoPart" key={key}>
                        {
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: e.content,
                                }}
                            />
                        }
                    </div>
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default Rodo;
