import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserStatus } from "../api/api";
import ProfileCard from "../components/ProfileCard";
import StatusBoard from "../components/StatusBoard";
import TimeLog from "../components/TimeLog";
import classes from "../styles/CheckInPage.module.css";
import useCluster from "../utils/hooks/useCluster";
import useUser from "../utils/hooks/useUser";
import { DEFAULT_PROFILE } from "../utils/utils";

const CheckInPage = () => {
  const checkinCardWrapper = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const {
    user: { isLogin },
    setUser,
    logout,
  } = useUser();
  const { setCurrentUserCount } = useCluster();
  const getUserData = useCallback(async () => {
    try {
      const getUserStatusRes = await getUserStatus();
      const { user, cluster, isAdmin } = getUserStatusRes.data;

      setUser({
        isLogin,
        id: user.login,
        cardNum: user.card !== null ? user.card : "",
        status: user.card !== null ? "in" : "out",
        profile: user.profile_image_url || DEFAULT_PROFILE,
        isAdmin,
      });

      setCurrentUserCount({
        gaepo: cluster.gaepo,
        seocho: cluster.seocho,
      });
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      logout();
    }
  }, [isLogin, logout, setCurrentUserCount, setUser]);

  const handleFlip = () => {
    setIsCardFlipped((state) => !state);
  };

  useLayoutEffect(() => {
    getUserData();
  }, [isLogin, history, getUserData]);

  return (
    <div className={classes["checkin-wrapper"]}>
      <StatusBoard />
      <div
        ref={checkinCardWrapper}
        className={`${classes["checkin-card-wrapper"]} ${
          !isCardFlipped ? classes.front : classes.back
        }`}
      >
        {/* {!isFlipped ? <ProfileCard handleFlip={handleFlip} /> : <TimeLog handleFlip={handleFlip} />} */}
        <ProfileCard handleFlip={handleFlip} />
        <TimeLog handleFlip={handleFlip} />
      </div>
    </div>
  );
};
export default CheckInPage;
