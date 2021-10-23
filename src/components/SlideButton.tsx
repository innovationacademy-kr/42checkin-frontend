import React, { useRef } from "react";
import classes from "../styles/SlideButton.module.css";

// TODO: 로직 지저분함 추후에 개선
interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const SlideButton: React.FC<IProps> = ({ value, setValue }) => {
  const slider = useRef<HTMLInputElement>(null);
  const sliderText = useRef<HTMLParagraphElement>(null);

  const setSlideValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(parseInt(e.currentTarget.value, 10));

  const changeSlider = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    if (!(slider.current && sliderText.current)) return;
    const currentValue = parseInt(e.currentTarget.value, 10);
    if (currentValue > 20) sliderText.current.style.opacity = "0";
    if (currentValue > 50) slider.current.style.background = "black";
    else slider.current.style.background = "";
  };

  const checkSliderValue = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    if (!(slider.current && sliderText.current)) return;
    const currentValue = parseInt(e.currentTarget.value, 10);
    if (currentValue < 80) {
      slider.current.style.background = "";
      sliderText.current.style.opacity = "";
      setValue(0);
    } else setValue(100);
  };

  return (
    <div className={classes["slider-wrapper"]}>
      <input
        onMouseUp={checkSliderValue}
        onTouchEnd={checkSliderValue}
        onMouseMove={changeSlider}
        onTouchMove={changeSlider}
        ref={slider}
        type='range'
        value={value}
        min={1}
        max={100}
        onChange={setSlideValue}
        className={classes.slider}
      />
      <p ref={sliderText} className={classes["slider-backgroundText"]}>
        밀어서 체크아웃
      </p>
    </div>
  );
};

export default SlideButton;
