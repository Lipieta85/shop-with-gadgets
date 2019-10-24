import React from "react";
import OrderSummary from "../components/Order/OrderSummary";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";

const OrderContainer = () => {
    return (
        <>
            <NavMenuClient />
            <OrderSummary />
        </>
    );
};

export default OrderContainer;
