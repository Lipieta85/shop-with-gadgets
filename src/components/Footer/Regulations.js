import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import NavMenu from "../Nav/NavMenuClient";
import "../../assets/styles/regulations.scss";
import { getStorePolicy } from "./../../api/index";
import Spinner from "./../UI/Spinner/Spinner";

const Regulations = props => {
    const [policy, setPolicy] = useState("");
    const token = localStorage.getItem("token");
    const lang = useSelector(state => state.clientDataReducer.language);

    useEffect(() => {
        getStorePolicy(token, lang).then(res => {
            setPolicy(res.data.data.objects);
        });
    }, [token, lang]);

    return (
        <div className="regulations">
            <NavMenu />
            {policy ? (
                (window.onload = policy.map((e, key) => (
                    <>
                        <h2>{e.title}</h2>
                        <div id="regPart" key={key}>
                            {
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: e.content,
                                    }}
                                />
                            }
                        </div>
                    </>
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
