import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserStatus } from "../api/api";
import ProfileCard from "../components/ProfileCard";
import StatusBoard from "../components/StatusBoard";
import TimeLog from "../components/TimeLog";
import useStatus from "../utils/hooks/useStatus";
import useUser from "../utils/hooks/useUser";
import { DEFAULT_PROFILE } from "../utils/utils";

import classes from "../styles/CheckInPage.module.css";

const CheckInPage = () => {
  const checkinCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const {
    user: { isLogin },
    setUser,
    logout,
  } = useUser();
  const { setHeadCount } = useStatus();
  const [isFlipped, setIsFlipped] = useState(false);
  const getUserData = useCallback(async () => {
    try {
      const response = await getUserStatus();
      const { user, cluster } = response.data;

      setUser({
        isLogin,
        id: user.login,
        cardNum: user.card !== null ? user.card : "",
        status: user.card !== null ? "in" : "out",
        profile: user.profile_image_url || DEFAULT_PROFILE,
      });

      setHeadCount({
        gaepo: cluster.gaepo,
        seocho: cluster.seocho,
      });
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      logout();
    }
  }, [isLogin, logout, setHeadCount, setUser]);

  const handleFlip = () => {
    setIsFlipped((state) => !state);
    const elem = checkinCardWrapper.current;
    if (!elem) {
      alert("에러ㅠ");
      return;
    }
    if (elem.style.transform === "rotateY(180deg)") elem.style.transform = "rotateY(0deg)";
    else elem.style.transform = "rotateY(180deg)";
  };

  useEffect(() => {
    if (!isLogin) history.push("/");
    getUserData();
  }, [isLogin, history, getUserData]);

  return (
    <div className={classes["checkin-wrapper"]}>
      <StatusBoard />
      <div ref={checkinCardWrapper} className={classes["checkin-card-wrapper"]}>
        {!isFlipped ? <ProfileCard handleFlip={handleFlip} /> : <TimeLog handleFlip={handleFlip} />}
      </div>
    </div>
  );
};
export default CheckInPage;
