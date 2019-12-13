import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "../../../assets/styles/spinner.scss";

const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress === true ? (
                <div className="spinner-border load-spinner" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : null}
        </div>
    );
};

export default Spinner;
