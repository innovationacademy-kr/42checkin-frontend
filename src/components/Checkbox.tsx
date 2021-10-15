import "../styles/Checkbox.css";
import React from "react";

interface IProps {
  idx: number;
  text: string;
  checkStatus: boolean[];
  setCheckStatus: (v: boolean[]) => void;
}

// TODO:로직 변경 필요
const Checkbox = (props: IProps) => {
  const { idx, text, checkStatus, setCheckStatus } = props;

  const handleChange = () => {
    const checked = checkStatus[idx];
    setCheckStatus([...checkStatus.slice(0, idx), !checked, ...checkStatus.slice(idx + 1)]);
  };

  return (
    <div>
      <label htmlFor={idx.toString()} className='checkbox-text'>
        <input
          id={idx.toString()}
          className='checkbox'
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
