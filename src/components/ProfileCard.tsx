import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import Button from "./Button";
import CheckInForm from "./CheckInForm";
import { postCheckOut, postCheckIn } from "../api/api";

import classes from "../styles/ProfileCard.module.css";
import SlideButton from "./SlideButton";
import useUser from "../utils/hooks/useUser";

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip }) => {
  const history = useHistory();
  const {
    user: { cardNum, status, id, profile },
    setCardNum,
  } = useUser();

  const [checkAll, setCheckAll] = useState(false);
  const [checkStatus, setCheckStatus] = useState([false, false, false]);

  const handleCheckIn = useCallback(async () => {
    try {
      await postCheckIn(cardNum);
      history.push("/end");
      return true;
    } catch (err: any) {
      if (err.response.data.code === 404) alert(err.response.data.message);
      else
        alert("체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.");
      setCardNum({ cardNum: "" });
    }
    return false;
  }, [cardNum, history, setCardNum]);

  const handleCheckOut = useCallback(async () => {
    try {
      await postCheckOut();
      history.push("/end");
    } catch (err: any) {
      if (!err.response) {
        alert("정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.");
      } else if (err.response.data.code === 404) {
        alert("이미 체크아웃 되었습니다.");
        history.push("/");
      } else {
        alert(err.response.data.message);
      }
    }
  }, [history]);

  useEffect(() => {
    if (JSON.stringify(checkStatus) === JSON.stringify([true, true, true])) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
    return () => {
      setCheckAll(false);
    };
  }, [checkStatus]);

  // slider
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);

  return (
    <div className={classes.profileCard}>
      <div
        style={{
          textAlign: "right",
          width: "100%",
        }}
      >
        <ListIcon onClick={handleFlip} />
      </div>
      <div className={classes["profile-wrapper"]}>
        <img className={classes.profile} src={profile} alt='profile' />
        <h2>{id}</h2>
      </div>
      {status === "out" ? (
        <CheckInForm
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          checkStatus={checkStatus}
          setCheckStatus={setCheckStatus}
          handleCheckIn={handleCheckIn}
        />
      ) : (
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
      )}
    </div>
  );
};

export default ProfileCard;
