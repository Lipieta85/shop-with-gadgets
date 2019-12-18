import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/rodo.scss";
import { getRodoPolicy } from "./../../api/index";

const Rodo = () => {
    const [rodo, setRodo] = useState("");
    const token = sessionStorage.getItem("token");

    getRodoPolicy(token).then(res => {
        setRodo(res.data.data.objects);
    });
    return (
        <div className="rodo">
            <NavMenu />
            <p> {rodo ? rodo.map(e => e.content) : "brak danych"}</p>
        </div>
    );
};

export default Rodo;
