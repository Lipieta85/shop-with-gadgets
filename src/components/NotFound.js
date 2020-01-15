import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../assets/styles/order-end.scss";
import { signOut } from "../actions/authorization";
import host from "../api/host";

export default function NotFound() {
    const dispatch = useDispatch();
    const link = `${host}site/desktop`;

    useEffect(() => {
        dispatch(signOut());
    }, [dispatch]);
    
    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>Twoje dane autoryzacyjne wygasły, zaloguj sie ponownie</h3>
                <a className="btn btn-outline-primary mt-4" href={link} onClick={dispatch(signOut())}>
                    Wróć do strony logowania
                </a>
            </div>
        </div>
    );
}
