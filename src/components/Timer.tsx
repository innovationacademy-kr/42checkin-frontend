import React, { useState, useEffect } from "react";

interface IProps {
  mm: string;
  ss: string;
}

const Timer: React.FC<IProps> = ({ mm, ss }) => {
  const [minutes, setMinutes] = useState(parseInt(mm, 10));
  const [seconds, setSeconds] = useState(parseInt(ss, 10));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <div style={{ margin: "10px" }}>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
