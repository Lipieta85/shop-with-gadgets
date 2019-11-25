import React from "react";

const Spinner = () => (
    <div
        className="spinner-border"
        style={{ width: "5rem", height: "5rem", margin: "auto" }}
        role="status"
    >
        <span className="sr-only">Loading...</span>
    </div>
);

export default Spinner;
