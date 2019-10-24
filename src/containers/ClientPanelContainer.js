import React from "react";
import NavMenuClient from "../components/ClientPanel/NavMenuClient";
import ClientPanel from "../components/ClientPanel/ClientPanel";

const ClientPanelContainer = () => {
    return (
        <>
            <NavMenuClient />
            <ClientPanel />
        </>
    );
};

export default ClientPanelContainer;
