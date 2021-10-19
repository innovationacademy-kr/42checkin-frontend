// TODO: fix lint rule
import React, { useCallback } from "react";
import Checkbox from "./Checkbox";
import { checkLists } from "../utils/notice";
import "../styles/CheckInForm.css";
import useUser from "../utils/hooks/useUser";

interface IProps {
  checkAll: boolean;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
  checkStatus: boolean[];
  setCheckStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  isFold: boolean;
  setIsFold: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckInForm: React.FC<IProps> = ({
  checkAll,
  setCheckAll,
  checkStatus,
  setCheckStatus,
  // isFold,
  setIsFold,
}) => {
  // const { cardNum } = useSelector(
  //   (state: RootState) => ({
  //     cardNum: state.userReducer.cardNum,
  //   }),
  //   shallowEqual,
  // );
  const {
    user: { cardNum },
    setCardNum,
  } = useUser();

  const handleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <label htmlFor='allCheck' style={{ fontSize: "1em" }}>
          <input
            id='allCheck'
            style={{ fontSize: "1em", margin: "5px" }}
            type='checkbox'
            checked={checkAll}
            onChange={handleCheckAll}
          />
          <span>모두 동의</span>
          <span style={{ color: "red", fontWeight: "bold" }}>*</span>
        </label>
        {/* {!isFold && ( */}
        <div>
          {checkLists.map((checkList, idx) => (
            <Checkbox
              key={checkList}
              idx={idx}
              text={checkList}
              checkStatus={checkStatus}
              setCheckStatus={setCheckStatus}
            />
          ))}
        </div>
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          id='cardNumber'
          type='number'
          value={cardNum}
          inputMode='numeric' /* 숫자형 키패드 */
          placeholder='카드 번호'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCardNum({ cardNum: e.target.value });
          }}
        />
      </div>
    </>
  );
};
export default CheckInForm;
