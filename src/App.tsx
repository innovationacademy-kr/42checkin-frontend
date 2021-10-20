import React, { useEffect, useCallback } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { getCookieValue } from "./utils/utils";
import { getMaxCapacity, getUsingCard } from "./api/api";
import AppRouter from "./components/AppRouter";
import { RootState } from "./redux/modules";

import "./App.css";
import useConfig from "./utils/hooks/useConfig";
import useStatus from "./utils/hooks/useStatus";
import useUser from "./utils/hooks/useUser";

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
  const {
    setConfig,
    config: { openAt, closeAt },
  } = useConfig();
  const { setHeadCount } = useStatus();
  const { login, logout } = useUser();
  // const { openAt, closeAt } = useSelector(state => ({
  //   openAt: state.config.openAt,
  //   closeAt: state.config.closeAt
  // }));

  const getConfig = useCallback(async () => {
    try {
      const today = new Date();
      const response = await getMaxCapacity(today.toISOString().slice(0, 10));
      setConfig({
        openAt: "",
        closeAt: "",
        seocho: response.data.seocho,
        gaepo: response.data.gaepo,
      });
    } catch (err) {
      console.log(err);
    }
  }, [setConfig]);

  const getHeadCount = useCallback(async () => {
    try {
      const response = await getUsingCard();
      setHeadCount(response.data);
    } catch (err) {
      console.log(err);
    }
  }, [setHeadCount]);

  useEffect(() => {
    if (!getCookieValue(process.env.REACT_APP_AUTH_KEY || "")) {
      logout();
      getHeadCount();
    } else {
      login();
    }
    getConfig();
  }, [getConfig, getHeadCount, login, logout]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    const handleResize = () => {
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div id='page-wrapper'>
        {window.location.pathname.split("/")[1] !== "admin" && openAt && closeAt && (
          <Alert severity='info' variant='filled' className={classes.info}>
            <AlertTitle className={classes.title}>
              운영 시간: {openAt} ~ {closeAt}
            </AlertTitle>
            <span>※ 사회적 거리두기 단계에 따라 운영시간 변경 가능</span>
          </Alert>
        )}
        <AppRouter />
      </div>
      <footer id='version'>v{process.env.REACT_APP_VERSION}</footer>
    </>
  );
}

export default App;
