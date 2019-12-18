import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/regulations.scss";
import { getStorePolicy } from "./../../api/index";

const Regulations = () => {
    const [policy, setPolicy] = useState("");
    const token = sessionStorage.getItem("token");

    getStorePolicy(token).then(res => {
        setPolicy(res.data.data.objects);
    });
    return (
        <div className="regulations">
            <NavMenu />
            <p> {policy ? policy.map(e => e.content) : "brak danych"}</p>
        </div>
    );
};

export default Regulations;
