import React, { useCallback, useEffect } from "react";
import "../styles/Slider.css";
const SlideButton = ({ value, setValue }) => {
  const setSlideValue = useCallback(
    (e) => {
      const va = e.currentTarget.value;
      setValue(va);
    },
    [setValue]
  );

  useEffect(() => {
    const slider = document.getElementById("slider");
    const checkSliderValue = (e) => {
      const currentValue = e.target.value;
      if (currentValue < 80) {
        // slider.style.background = "white";
        setValue(0);
      } else setValue(100);
    };
    const changeSliderBackground = (e) => {
      const currentValue = e.target.value;
      if (currentValue > 80) slider.style.background = "rgba(211, 211, 211, 1)";
      else slider.style.background = "";
    };
    slider.addEventListener("mouseup", checkSliderValue);
    slider.addEventListener("touchend", checkSliderValue);
    slider.addEventListener("mousemove", changeSliderBackground);
    slider.addEventListener("touchmove", changeSliderBackground);
    return () => {
      setValue(0);
      slider.removeEventListener("mouseup", checkSliderValue);
      slider.removeEventListener("touchend", checkSliderValue);
    };
  }, [setValue]);

  return (
    <div className="slider-container">
      <input placeholder="slide to quit" type="range" value={value} min={1} max={100} onChange={setSlideValue} id="slider"></input>
      <p className="slider-text">슬라이드 시 체크아웃</p>
    </div>
  );
};

export default SlideButton;
