import React from "react";
import OrderEnd from "../components/OrderEnd/OrderEnd";
import NavMenu from "../components/ClientPanel/NavMenuClient";

const OrderEndContainer = () => {
    return (
        <div>
            <NavMenu />
            <OrderEnd />
        </div>
    );
};

export default OrderEndContainer;
