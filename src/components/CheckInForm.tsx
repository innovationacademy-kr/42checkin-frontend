// TODO: fix lint rule
import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { checkLists } from "../utils/notice";
import classes from "../styles/CheckInForm.module.css";
import useUser from "../utils/hooks/useUser";
import Button from "./Button";

interface IProps {
  checkAll: boolean;
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
  checkStatus: boolean[];
  setCheckStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  handleCheckIn: () => Promise<boolean>;
}

const CheckInForm: React.FC<IProps> = ({
  checkAll,
  setCheckAll,
  checkStatus,
  setCheckStatus,
  handleCheckIn,
}) => {
  const {
    user: { cardNum },
    setCardNum,
  } = useUser();

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckStatus([isChecked, isChecked, isChecked]);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum({ cardNum: e.target.value });
  };

  const [readySubmit, setReadySubmit] = useState(false);

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [cardNum, checkAll]);

  useEffect(() => {
    checkSubmitCondition();
  }, [checkSubmitCondition]);

  return (
    <form className={classes.form}>
      <div className={classes["check-in-form-wrapper"]}>
        <label htmlFor='allCheck' className={classes.allCheck}>
          <input id='allCheck' type='checkbox' checked={checkAll} onChange={handleCheckAll} />
          <span>모두 동의</span>
          <span className={classes.asterisk}>*</span>
        </label>
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
          onChange={handleCardNumberChange}
        />
      </div>
      <Button
        type='submit'
        className={classes.submitBtn}
        handleClick={handleCheckIn}
        text='CHECK IN'
        disabled={!readySubmit}
      />
    </form>
  );
};
export default CheckInForm;
