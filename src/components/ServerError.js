import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/order-end.scss";
import { signOut } from "../actions/authorization";
import host from "../api/host";

export default function ServerError() {
    const errorText = useSelector(state => state.cartReducer.error)
    const dispatch = useDispatch();
    const link = `${host}/site/desktop`;

    useEffect(() => {
        dispatch(signOut());
    }, [dispatch]);
    
    return (
        <div className="order-end text-center">
            <div className="order-end-box">
                <h3>Wystąpił błąd serwera, skontaktuj się ze swoim opiekunem</h3>
                <p>{errorText}</p>
                <a className="btn btn-outline-primary mt-4" href={link}>
                    Wróć do strony logowania
                </a>
            </div>
        </div>
    );
}
