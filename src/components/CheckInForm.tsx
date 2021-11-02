// TODO: fix lint rule
import React, { useCallback, useEffect, useState } from "react";
import List from "./List";
import { checkLists } from "../utils/notice";
import classes from "../styles/CheckInForm.module.css";
import useUser from "../utils/hooks/useUser";
import Button from "./Button";

interface IProps {
  handleCheckIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean>;
}

const CheckInForm: React.FC<IProps> = ({ handleCheckIn }) => {
  const {
    user: { cardNum },
    setCardNum,
  } = useUser();

  const [checkAll, setCheckAll] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
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

  return (
    <form className={classes.form} onSubmit={handleCheckIn}>
      <div className={classes["check-in-form-wrapper"]}>
        <label htmlFor='allCheck' className={classes.allCheck}>
          <input
            id='allCheck'
            type='checkbox'
            checked={checkAll}
            onChange={handleCheckAll}
            className={classes.allCheckBox}
          />
          <span>클러스터 이용 약관에 모두 동의합니다.</span>
          <span className={classes.asterisk}>*</span>
        </label>
        <ul className={classes["check-list-wrapper"]}>
          {checkLists.map((checkList) => (
            <List key={checkList} text={checkList} />
          ))}
        </ul>
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
