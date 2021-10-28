import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import StatusBoard from "../components/StatusBoard";
// import StatusChart from '../components/StatusChart';
import Button from "../components/Button";

import classes from "../styles/LandingPage.module.css";
import { RootState } from "../redux/modules";

function LandingPage() {
  const history = useHistory();
  const { isLogin } = useSelector(
    (state: RootState) => ({
      isLogin: state.userReducer.isLogin,
    }),
    shallowEqual,
  );
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/user/login?redirect=${encodeURIComponent(
      window.location.href,
    )}`;
  };

  useEffect(() => {
    if (isLogin) history.push("/checkin");
  }, [history, isLogin]);

  return (
    <div className={classes["landing-wrapper"]}>
      <h1>Check In Cluster</h1>
      <StatusBoard />
      {/* <StatusChart /> */}
      <Button type='button' className={classes.submitBtn} handleClick={handleLogin} text='LOG IN' />
    </div>
  );
}

export default LandingPage;
