// TODO: fix lint rule
import React, { useCallback } from "react";
import Checkbox from "./Checkbox";
import { checkLists } from "../utils/notice";
import classes from "../styles/CheckInForm.module.css";
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

  return (
    <>
      <div className={classes["check-in-form-wrapper"]}>
        <label htmlFor='allCheck' className={classes.allCheck}>
          <input id='allCheck' type='checkbox' checked={checkAll} onChange={handleCheckAll} />
          <span>모두 동의</span>
          <span className={classes.asterisk}>*</span>
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
      <div className={classes["cardNumber-wrapper"]}>
        <input
          className={classes.cardNumber}
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
