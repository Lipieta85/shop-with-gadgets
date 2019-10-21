import React from "react";
import Basket from "../components/Basket/Basket";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";

const BasketContainer = () => {
    return (
        <>
            <NavMenuClient />
            <Basket />
        </>
    );
};

export default BasketContainer;
