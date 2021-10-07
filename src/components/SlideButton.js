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
      // if (currentValue > 80) slider.style.background = "red";
      // else slider.style.background = "white";
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
      <span className="slider-text">slide to checkout</span>
    </div>
  );
};

export default SlideButton;
