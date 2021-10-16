import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/EndPage.css";

const EndPage = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push("/checkin"), 1000);
  });

  return (
    <div id='text-wrapper'>
      <h1 id='ending-text'>Complete!</h1>
    </div>
  );
};

export default EndPage;
