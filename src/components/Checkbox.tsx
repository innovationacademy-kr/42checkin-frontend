import React from "react";
import classes from "../styles/Checkbox.module.css";

interface IProps {
  idx: number;
  text: string;
  checkStatus: boolean[];
  setCheckStatus: (v: boolean[]) => void;
}

const Checkbox = (props: IProps) => {
  const { idx, text, checkStatus, setCheckStatus } = props;

  const handleChange = () => {
    const checked = checkStatus[idx];
    setCheckStatus([...checkStatus.slice(0, idx), !checked, ...checkStatus.slice(idx + 1)]);
  };

  return (
    <div>
      <label htmlFor={idx.toString()} className={classes["checkbox-text"]}>
        <input
          id={idx.toString()}
          className={classes.checkbox}
          type='checkbox'
          checked={checkStatus[idx]}
          onChange={handleChange}
        />
        {text}
      </label>
    </div>
  );
};
export default Checkbox;
