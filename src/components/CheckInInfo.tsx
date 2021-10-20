import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../redux/configureStore";

const CheckInInfo = () => {
  const { cardNum } = useSelector(
    (state: RootState) => ({
      cardNum: state.userReducer.cardNum,
    }),
    shallowEqual,
  );

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20 }}>Card Number</div>
        <div style={{ fontSize: 70 }}>{cardNum}</div>
      </div>
    </div>
  );
};
export default CheckInInfo;
