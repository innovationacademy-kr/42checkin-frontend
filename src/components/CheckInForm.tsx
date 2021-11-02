// TODO: fix lint rule
import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { checkLists as checkListStrings } from "../utils/notice";
import classes from "../styles/CheckInForm.module.css";
import useUser from "../utils/hooks/useUser";
import Button from "./Button";

interface IProps {
  handleCheckIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}
const checkList = checkListStrings.map((v, idx) => ({ id: idx, text: v, checked: false }));
const CheckInForm: React.FC<IProps> = ({ handleCheckIn }) => {
  const {
    user: { cardNum },
    setCardNum,
  } = useUser();

  const [checkAll, setCheckAll] = useState(false);
  const [checkStatus, setCheckStatus] = useState(checkList);
  const [readySubmit, setReadySubmit] = useState(false);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckStatus((prev) => prev.map((v) => ({ ...v, checked: isChecked })));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNum({ cardNum: e.target.value });
  };

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [cardNum, checkAll]);

  useEffect(() => {
    checkSubmitCondition();

    return () => {
      setReadySubmit(false);
    };
  }, [checkSubmitCondition]);

  useEffect(() => {
    if (checkStatus.every((status) => status.checked)) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }

    return () => {
      setCheckAll(false);
    };
  }, [checkStatus]);

  return (
    <form className={classes.form} onSubmit={handleCheckIn}>
      <div className={classes["check-in-form-wrapper"]}>
        <label htmlFor='allCheck' className={classes.allCheck}>
          <input id='allCheck' type='checkbox' checked={checkAll} onChange={handleCheckAll} />
          <span>모두 동의</span>
          <span className={classes.asterisk}>*</span>
        </label>
        <div>
          {checkStatus.map((status) => (
            <Checkbox
              key={status.id}
              id={status.id}
              text={status.text}
              isChecked={status.checked}
              setCheckStatus={setCheckStatus}
            />
          ))}
        </div>
      </div>
      <div className={classes["cardNumber-wrapper"]}>
        <input
          className={classes.cardNumber}
          type='number'
          min={1}
          value={cardNum}
          inputMode='numeric' /* 숫자형 키패드 */
          placeholder='카드 번호'
          onChange={handleCardNumberChange}
        />
      </div>
      <Button type='submit' className={classes.submitBtn} text='CHECK IN' disabled={!readySubmit} />
    </form>
  );
};
export default CheckInForm;
