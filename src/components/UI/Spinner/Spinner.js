import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { useSelector } from "react-redux";
import "../../../assets/styles/spinner.scss";
const Spinner = () => {
    const pageLock = useSelector(state => state.pageReducer.pageLock);
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress === true && pageLock === true ? (
                <div className="d-flex justify-content-center spinner">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Spinner;
