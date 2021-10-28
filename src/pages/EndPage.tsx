import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "../styles/EndPage.module.css";

const EndPage = () => {
  const history = useHistory();

  useEffect(() => {
    const timeOutId = setTimeout(() => history.push("/checkin"), 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [history]);

  return (
    <div className={classes["text-wrapper"]}>
      <h1 className={classes["ending-text"]}>Complete!</h1>
    </div>
  );
};

export default EndPage;
