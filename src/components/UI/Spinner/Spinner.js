import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const Spinner = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div>
            {promiseInProgress === true ? (
                <div class="d-flex justify-content-center position-fixed" style={{top: "45%", left: "45%"}}>
                <div class="spinner-border" role="status" style={{width: "70px", height: "70px"}}>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
        </div>
    );
};

export default Spinner;
