import React, { useRef } from "react";
import "../styles/Slider.css";

const SlideButton = ({ value, setValue }) => {
  const slider = useRef(null);
  const sliderText = useRef(null);

  const setSlideValue = (e) => setValue(e.currentTarget.value);
  const changeSlider = (e) => {
    const currentValue = e.target.value;
    if (currentValue > 20) sliderText.current.style.opacity = 0;
    if (currentValue > 50) slider.current.style.background = "black";
    else slider.current.style.background = "";
  };

  const checkSliderValue = (e) => {
    const currentValue = e.target.value;
    if (currentValue < 80) {
      slider.current.style.background = "";
      sliderText.current.style.opacity = "";
      setValue(0);
    } else setValue(100);
  };

  return (
    <div className="slider-container">
      <input
        onMouseUp={checkSliderValue}
        onTouchEnd={checkSliderValue}
        onMouseMove={changeSlider}
        onTouchMove={changeSlider}
        ref={slider}
        type="range"
        value={value}
        min={1}
        max={100}
        onChange={setSlideValue}
        id="slider"
      ></input>
      <div ref={sliderText} className="slider-background-text">
        밀어서 체크아웃
      </div>
    </div>
  );
};

export default SlideButton;
