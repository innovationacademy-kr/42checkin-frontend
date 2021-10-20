import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserStatus } from "../api/api";
import ProfileCard from "../components/ProfileCard";
import StatusBoard from "../components/StatusBoard";
import TimeLog from "../components/TimeLog";
import "../styles/CheckInPage.css";
import useStatus from "../utils/hooks/useStatus";
import useUser from "../utils/hooks/useUser";
import { DEFAULT_PROFILE } from "../utils/utils";

const CheckInPage = () => {
  const history = useHistory();
  const {
    user: { isLogin },
    setUser,
    logout,
  } = useUser();
  const { setHeadCount } = useStatus();
  const [isFlip, setIsFlip] = useState(false);

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

  // const getHeadCount = useCallback(async () => {
  //   try {
  //     const response = await getUsingCard();
  //     dispatch(setHeadCount(response.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch]);

  const handleFlip = () => {
    setIsFlip((state) => !state);
    const elem = document.getElementById("checkin-card-wrapper") as HTMLElement;
    if (elem.style.transform === "rotateY(180deg)") elem.style.transform = "rotateY(0deg)";
    else elem.style.transform = "rotateY(180deg)";
  };

  useEffect(() => {
    if (!isLogin) history.push("/");
    getUserData();
    // getHeadCount();
  }, [isLogin, history, getUserData]);

  return (
    <div id='checkin-wrapper'>
      {/* <h2 style={{ marginBottom: '0' }}>CHECK IN</h2> */}
      <StatusBoard />
      <div id='checkin-card-wrapper'>
        {!isFlip ? <ProfileCard handleFlip={handleFlip} /> : <TimeLog handleFlip={handleFlip} />}
      </div>
    </div>
  );
};
export default CheckInPage;
