import React from "react";
import { usePromiseTracker } from "react-promise-tracker";

const ScreenLock = () => {
    const { promiseInProgress } = usePromiseTracker();

    const stylesHandler = () => {
        return promiseInProgress === true
            ? {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,.2)",
                  zIndex: 1000
              }
            : null;
    };

    return <div style={stylesHandler()}></div>;
};

export default ScreenLock;
