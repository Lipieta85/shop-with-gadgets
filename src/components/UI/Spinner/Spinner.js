import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress === true ? (
                <div className="d-flex justify-content-center position-fixed" style={{top: "46%", left: "48%"}}>
                <div className="spinner-border" role="status" style={{width: "70px", height: "70px", zIndex:'9999'}}>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
        </div>
    );
};

export default Spinner;
