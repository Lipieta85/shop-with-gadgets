import React from "react";
import OrderOptions from "../components/Order/OrderOptions";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import OrderSummary from "../components/Order/OrderSummary";

const OrderContainer = () => {
    return (
        <>
            <NavMenuClient />
            <OrderOptions />
        </>
    );
};

export default OrderContainer;
