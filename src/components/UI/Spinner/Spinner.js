import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress === true ? (
                <div
                    className="spinner-border"
                    style={{
                        width: "8rem",
                        height: "8rem",
                        position: "fixed",
                        bottom: "44%",
                        left: "34%",
                        zIndex: "999"
                    }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            ) : null}
        </div>
    );
};

export default Spinner;
