import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import UserInput from "../components/UserInput";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { checkLists } from "../utils/notice";
import { checkAdmin, checkOut, checkIn, getUsingCard } from "../api/api";
import { setHeadCount } from "../redux/modules/status";
import { logout } from "../redux/modules/user";

import StatusBoard from "../components/StatusBoard";
import { setUser, setCardNum } from "../redux/modules/user";
import "../styles/CheckInPage.css";
import SlideButton from "../components/SlideButton";

function CheckInPage() {
  const history = useHistory();
  const { isLogin, id, cardNum, status } = useSelector(
    (state) => ({
      isLogin: state.user.isLogin,
      id: state.user.id,
      cardNum: state.user.cardNum,
      status: state.user.status,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);
  const [checkStatus, setCheckStatus] = useState([false, false, false]);
  const [readySubmit, setReadySubmit] = useState(false);

  const handleCheckIn = useCallback(async () => {
    if (readySubmit) {
      try {
        try {
          await checkIn(cardNum);
          history.push("/end");
        } catch (err) {
          alert(err.response.data.message);
        }
      } catch (err) {
        if (err.response.data.code === 404) alert(err.response.data.message);
        else {
          alert("체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.");
        }
      }
      dispatch(
        setCardNum({
          cardNum: "",
        })
      );
    }
  }, [cardNum, readySubmit, history, dispatch]);

  const handleCheckOut = useCallback(async () => {
    // if (window.confirm("퇴실 하시겠습니까?")) {
    try {
      await checkOut();
      history.push("/end");
    } catch (err) {
      if (!err.response) {
        alert("정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.");
      } else if (err.response.data.code === 404) {
        alert("이미 체크아웃 되었습니다.");
        history.push("/");
      } else {
        alert(err.response.data.message);
      }
    }
    // }
  }, [history]);

  const handleCheckAll = useCallback((e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckStatus([isChecked, isChecked, isChecked]);
  }, []);

  const getUserData = useCallback(async () => {
    try {
      const response = await checkAdmin();
      const { user } = response.data;
      dispatch(
        setUser({
          id: user.login,
          cardNum: user.card !== null ? user.card : "",
          status: user.card !== null ? "in" : "out",
        })
      );
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      dispatch(logout());
    }
  }, [dispatch]);

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [cardNum, checkAll]);

  const getHeadCount = useCallback(async () => {
    try {
      const response = await getUsingCard();
      dispatch(setHeadCount(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin) history.push("/");
    getUserData();
    getHeadCount();
  }, [isLogin, history, getUserData, getHeadCount]);

  useEffect(() => {
    if (status === "out") {
      checkSubmitCondition();
    }
  }, [cardNum, status, checkSubmitCondition]);

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

  //slider
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    if (sliderValue === 100) handleCheckOut();
  }, [handleCheckOut, sliderValue]);
  return (
    <div id="checkin-wrapper">
      <div id="checkinout">
        <h1>{status === "in" ? "42 Check Out" : "42 Check In"}</h1>
        <StatusBoard />
        <h3> Intra ID : {id}</h3>
        {status === "in" ? (
          <>
            <h3>카드 번호: {cardNum}</h3>
            <div>
              <SlideButton value={sliderValue} setValue={setSliderValue}></SlideButton>
            </div>
            {/* <Button className="submitBtn ready" handleClick={handleCheckOut} text="Check Out" /> */}
          </>
        ) : (
          <div>
            <div className="input-wrapper" style={{ textAlign: "left" }}>
              <label htmlFor="allCheck" style={{ fontSize: "1em" }}>
                <input id="allCheck" type="checkbox" checked={checkAll} onChange={handleCheckAll} />
                모두 동의
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="checkbox-wrapper">
                  {checkLists.map((checkList, idx) => (
                    <Checkbox key={idx} idx={idx} text={checkList} checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
                  ))}
                </div>
              </div>
            </div>
            <UserInput
              label="카드 번호"
              type="number"
              placeholder="카드 번호를 입력해주세요"
              value={cardNum}
              handleChange={(e) => {
                dispatch(setCardNum(e.target.value));
              }}
            />
            <Button className={`submitBtn ${readySubmit ? " ready" : ""}`} handleClick={handleCheckIn} text="Check In" />
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
}
export default CheckInPage;
