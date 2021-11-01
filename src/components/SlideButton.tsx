import React, { useLayoutEffect, useRef } from "react";
import classes from "../styles/SlideButton.module.css";

interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const SlideButton: React.FC<IProps> = ({ value, setValue }) => {
  const slider = useRef<HTMLInputElement>(null);
  const sliderText = useRef<HTMLParagraphElement>(null);

  const handleSliderChange = (
    e:
      | React.MouseEvent<HTMLInputElement>
      | React.TouchEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.currentTarget.value === "100") setValue(99);
    else setValue(parseInt(e.currentTarget.value, 10));
  };

  const handleSliderTouchEnd = (
    e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>,
  ) => {
    if (!(slider.current && sliderText.current)) return;
    const currentValue = parseInt(e.currentTarget.value, 10);
    if (currentValue < 80) setValue(0);
    else setValue(100);
  };

  useLayoutEffect(() => {
    if (!(slider.current && sliderText.current)) return;

    if (value > 1) sliderText.current.style.opacity = "0";
    else sliderText.current.style.opacity = "";

    if (value > 80) slider.current.style.background = "black";
    else slider.current.style.background = "";
  }, [value]);

  return (
    <div className={classes["slider-wrapper"]}>
      <input
        onMouseUp={handleSliderTouchEnd}
        onTouchEnd={handleSliderTouchEnd}
        onMouseMove={handleSliderChange}
        onTouchMove={handleSliderChange}
        ref={slider}
        type='range'
        value={value}
        min={1}
        max={100}
        onChange={handleSliderChange}
        className={classes.slider}
      />
      <p ref={sliderText} className={classes["slider-backgroundText"]}>
        밀어서 체크아웃
      </p>
    </div>
  );
};

export default SlideButton;
