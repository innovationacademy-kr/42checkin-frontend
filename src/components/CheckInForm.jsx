/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
// TODO: fix lint rule
import React, { useCallback } from "react";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Checkbox from "./Checkbox";
import { checkLists } from "../utils/notice";
import { setCardNum } from "../redux/modules/user";
import "../styles/CheckInForm.css";

// interface IProps {
//   checkAll: boolean;
//   setCheckAll: string;
//   checkStatus: string;
//   setCheckStatus: string;
//   isFold: string;
//   setIsFold: string;
// }

const CheckInForm = ({ checkAll, setCheckAll, checkStatus, setCheckStatus, isFold, setIsFold }) => {
  const dispatch = useDispatch();
  const { cardNum } = useSelector(
    (state) => ({
      cardNum: state.user.cardNum,
    }),
    shallowEqual,
  );

  const handleCheckAll = useCallback(
    (e) => {
      const isChecked = e.target.checked;
      setCheckAll(isChecked);
      setCheckStatus([isChecked, isChecked, isChecked]);
      setIsFold(true);
    },
    [setCheckAll, setCheckStatus, setIsFold],
  );

  // const handleClick = () => {
  //   setIsFold(state => !state);
  // };
  return (
    <>
      <div id='check-in-form-wrapper'>
        <input
          id='allCheck'
          style={{ fontSize: "1em", margin: "5px" }}
          type='checkbox'
          checked={checkAll}
          onChange={handleCheckAll}
        />
        <label htmlFor='allCheck' style={{ fontSize: "1em" }}>
          <span>모두 동의</span>
          <span style={{ color: "red", fontWeight: "bold" }}>*</span>
        </label>
        {/* {!isFold && ( */}
        <div>
          {checkLists.map((checkList, idx) => (
            <Checkbox
              key={idx}
              idx={idx}
              text={checkList}
              checkStatus={checkStatus}
              setCheckStatus={setCheckStatus}
            />
          ))}
        </div>
        {/* )} */}
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          id='cardNumber'
          type='number'
          value={cardNum}
          inputMode='numeric' /* 숫자형 키패드 */
          placeholder='카드 번호'
          onChange={(e) => {
            dispatch(setCardNum(e.target.value));
          }}
        />
      </div>
    </>
  );
};
export default CheckInForm;
