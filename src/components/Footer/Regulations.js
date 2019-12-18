import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/regulations.scss";
import { getStorePolicy } from "./../../api/index";
import Spinner from "./../UI/Spinner/Spinner";
const Regulations = () => {
    const [policy, setPolicy] = useState("");
    const token = sessionStorage.getItem("token");

    getStorePolicy(token).then(res => {
        setPolicy(res.data.data.objects);
    });
    return (
        <div className="regulations">
            <NavMenu />{" "}
            {policy ? (
                (window.onload = policy.map(e => (
                    <div id="regPart">
                        <h2>Regulamin sklepu</h2>
                        {
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: e.content,
                                }}
                            />
                        }
                    </div>
                )))
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default Regulations;
