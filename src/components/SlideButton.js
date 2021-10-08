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
    const sliderText = document.querySelector(".slider-background-text");

    const checkSliderValue = (e) => {
      const currentValue = e.target.value;

      if (currentValue < 80) {
        // slider.style.background = "white";
        sliderText.style.opacity=.5
        setValue(0);
      } else setValue(100);
    };

    const changeSlider = (e) => {
      const currentValue = e.target.value;
      if (currentValue > 20) sliderText.style.opacity= 0;
      if (currentValue > 80) slider.style.background = "rgba(211, 211, 211, 1)";
      else slider.style.background = "";
    };
    slider.addEventListener("mouseup", checkSliderValue);
    slider.addEventListener("touchend", checkSliderValue);
    slider.addEventListener("mousemove", changeSlider);
    slider.addEventListener("touchmove", changeSlider);
    return () => {
      setValue(0);
      slider.removeEventListener("mouseup", checkSliderValue);
      slider.removeEventListener("touchend", checkSliderValue);
    };
  }, [setValue]);

  return (
    <div className="slider-container">
      <input placeholder="slide to quit" type="range" value={value} min={1} max={100} onChange={setSlideValue} id="slider"></input>
      <div className="slider-background-text">밀어서 체크아웃</div>
    </div>
  );
};

export default SlideButton;
