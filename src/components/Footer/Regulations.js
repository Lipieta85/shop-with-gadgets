import React, { useState, useEffect } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/regulations.scss";
import { getStorePolicy } from "./../../api/index";
import Spinner from "./../UI/Spinner/Spinner";
const Regulations = () => {
    const [policy, setPolicy] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        getStorePolicy(token).then(res => {
            setPolicy(res.data.data.objects);
        });
    }, [token]);

    return (
        <div className="regulations">
            <NavMenu /> <h2>Regulamin sklepu</h2>
            {policy ? (
                (window.onload = policy.map((e, key) => (
                    <div id="regPart" key={key}>
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
                <div>
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default Regulations;
