import React, { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../redux/configureStore";
import classes from "../styles/StatusBoard.module.css";

const StatusBoard = () => {
  const { gaepoLimitation, seochoLimitation, gaepo, seocho } = useSelector(
    (state: RootState) => ({
      gaepoLimitation: state.configReducer.gaepoLimitation,
      seochoLimitation: state.configReducer.seochoLimitation,
      seocho: state.configReducer.seocho,
      gaepo: state.configReducer.gaepo,
    }),
    shallowEqual,
  );

  // const { gaepo, seocho } = useSelector((state: RootState) => ({
  //   gaepo: state.statusReducer.gaepo,
  //   seocho: state.statusReducer.seocho,
  // }));

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
