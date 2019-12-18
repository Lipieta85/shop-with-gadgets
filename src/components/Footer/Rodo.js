import React, { useState } from "react";
import NavMenu from "../ClientPanel/NavMenuClient";
import "../../assets/styles/rodo.scss";
import { getRodoPolicy } from "./../../api/index";
import Spinner from "./../UI/Spinner/Spinner";
const Rodo = () => {
    const [rodo, setRodo] = useState("");
    const token = sessionStorage.getItem("token");

    getRodoPolicy(token).then(res => {
        setRodo(res.data.data.objects);
    });
    return (
        <div className="rodo">
            <NavMenu />{" "}
            {rodo ? (
                rodo.map(e => (
                    <div id="rodoPart">
                        <h2>Regulamin RODO</h2>
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
