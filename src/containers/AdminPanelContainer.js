import React from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import NavMenu from "../components/HomePage/NavMenu";

const AdminPanelContainer = () => {
    return (
        <>
            <NavMenu />
            <AdminPanel />
        </>
    );
};

export default AdminPanelContainer;
