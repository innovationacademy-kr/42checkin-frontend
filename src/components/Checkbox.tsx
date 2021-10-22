import React from "react";
import classes from "../styles/Checkbox.module.css";

interface IProps {
  id: number;
  text: string;
  isChecked: boolean;
  setCheckStatus: React.Dispatch<React.SetStateAction<CheckBox[]>>;
}

const Checkbox = (props: IProps) => {
  const { id, text, isChecked, setCheckStatus } = props;

  const handleChange = () => {
    setCheckStatus((prev) => prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : { ...s })));
  };

  return (
    <div>
      <label htmlFor={id.toString()} className={classes["checkbox-text"]}>
        <input
          id={id.toString()}
          className={classes.checkbox}
          type='checkbox'
          checked={isChecked}
          onChange={handleChange}
        />
        {text}
      </label>
    </div>
  );
};
export default Checkbox;
