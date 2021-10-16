import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { getCookieValue } from "./utils/utils";
import { login, logout } from "./redux/modules/user";
import { setConfig } from "./redux/modules/config";
import { setHeadCount } from "./redux/modules/status";
import { getMaxCapacity, getUsingCard } from "./api/api";

import LandingPage from "./pages/LandingPage";
import CheckInPage from "./pages/CheckInPage";
import EndPage from "./pages/EndPage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckInLog from "./checkin-admin/views/CheckInLog";
import CheckInSetting from "./checkin-admin/views/CheckInSetting";

import "./App.css";

const useStyles = makeStyles(() => ({
  info: {
    background: "rgba(0, 0, 0, 0.5)",
    "& span": {
      fontSize: "0.6rem",
    },
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bolder",
    fontFamily: "D2Coding",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { openAt, closeAt } = useSelector(state => ({
  //   openAt: state.config.openAt,
  //   closeAt: state.config.closeAt
  // }));

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const getConfig = useCallback(async () => {
    try {
      const today = new Date();
      const response = await getMaxCapacity(today.toISOString().slice(0, 10));
      dispatch(
        setConfig({
          openAt: "",
          closeAt: "",
          seocho: response.data.seocho,
          gaepo: response.data.gaepo,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const getHeadCount = useCallback(async () => {
    try {
      const response = await getUsingCard();
      dispatch(setHeadCount(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    const token = getCookieValue(process.env.REACT_APP_AUTH_KEY);
    if (!token) {
      dispatch(logout());
      getHeadCount();
    } else {
      dispatch(login());
    }
    getConfig();
  }, [dispatch, getConfig, getHeadCount]);

  return (
    <>
      <BrowserRouter>
        <div id='page-wrapper'>
          {window.location.pathname.split("/")[1] !== "admin" && (
            /* openAt && closeAt &&  */
            <Alert severity='info' variant='filled' className={classes.info}>
              <AlertTitle className={classes.title}>
                {/* 운영 시간: {openAt} ~ {closeAt} */}
                운영 시간: 오전 7:00:00 ~ 오후 10:00:00
              </AlertTitle>
              <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
            </Alert>
          )}
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/checkin' exact component={CheckInPage} />
            <Route path='/end' exact component={EndPage} />
            <Route path='/admin/log' exact component={CheckInLog} />
            <Route path='/admin/setting' exact component={CheckInSetting} />
            <Redirect from='/submit' to='/checkin' />
            <Redirect from='/admin' to='/admin/log' />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
      <footer id='version'>v{process.env.REACT_APP_VERSION}</footer>
    </>
  );
}

export default App;
