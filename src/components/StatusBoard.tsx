import React from "react-redux";
import classes from "../styles/StatusBoard.module.css";
import useCluster from "../utils/hooks/useCluster";

const StatusBoard = () => {
  const {
    cluster: { gaepoLimitation, seochoLimitation, seocho, gaepo },
  } = useCluster();

  return (
    <div className={classes["status-board-wrapper"]}>
      <h3>개포</h3>
      <h3>
        {gaepo} / {gaepoLimitation}
      </h3>
      <h3>서초</h3>
      <h3>
        {seocho} / {seochoLimitation}
      </h3>
    </div>
  );
};

export default StatusBoard;
