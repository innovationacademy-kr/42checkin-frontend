import React, { useEffect, useState } from "react";
import useUser from "../utils/hooks/useUser";
import SlideButton from "./SlideButton";
import classes from "../styles/CheckOutUi.module.css";

interface IProps {
  handleCheckOut: () => Promise<void>;
}
const CheckOutUi: React.FC<IProps> = ({ handleCheckOut }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const {
    user: { cardNum },
  } = useUser();

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <>
      <hr className={classes.divider} />
      <div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20 }}>Card Number</div>
          <div style={{ fontSize: 70 }}>{cardNum}</div>
        </div>
      </div>
      <SlideButton value={sliderValue} setValue={setSliderValue} />
    </>
  );
};

export default CheckOutUi;
