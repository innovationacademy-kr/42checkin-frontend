import ListIcon from "@mui/icons-material/List";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getUserStatus, postCheckIn, postCheckOut } from "../api/api";
import classes from "../styles/ProfileCard.module.css";
import useUser from "../utils/hooks/useUser";
import CheckInForm from "./CheckInForm";
import CheckOutUi from "./CheckOutUi";

interface IProps {
  handleFlip: (e: React.MouseEvent) => void;
}

const ProfileCard: React.FC<IProps> = ({ handleFlip }) => {
  const history = useHistory();
  const {
    user: { cardNum, status, id, profile },
    setCardNum,
  } = useUser();

  const handleCheckIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { data: userData } = await getUserStatus();
        if (userData.user.card) throw new Error("이미 체크인 되었습니다.");
        const {
          data: { result },
        } = await postCheckIn(cardNum);
        if (!result)
          throw new Error(
            "체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.",
          );
        history.push("/end");
        return true;
      } catch (err: any) {
        let { message } = err;
        if (err.response?.data?.message) message = err.response.data.message;
        setCardNum({ cardNum: "" });
        alert(message);
        window.location.reload();
      }
      return false;
    },
    [cardNum, history, setCardNum],
  );

  const handleCheckOut = useCallback(async () => {
    try {
      const { data: userData } = await getUserStatus();
      if (!userData.user.card) throw new Error("이미 체크아웃 되었습니다.");
      const { data } = await postCheckOut();
      if (!data) throw new Error("무언가 잘못되었습니다.");

      history.push("/end");
    } catch (err: any) {
      let message = "";
      if (err.response?.data?.code === 404) {
        message = "이미 체크아웃 되었습니다.";
      } else if (err.response?.data?.message) {
        console.log(err.response);
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      } else {
        message = "정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.";
      }
      alert(message);
      window.location.reload();
    }
  }, [history]);

  return (
    <div className={classes.profileCard}>
      <div className={classes["util-box"]}>
        <ListIcon onClick={handleFlip} />
      </div>
      <div className={classes["profile-wrapper"]}>
        <img className={classes.profile} src={profile} alt='profile' />
        <h2>{id}</h2>
      </div>
      {status === "out" ? (
        <CheckInForm handleCheckIn={handleCheckIn} />
      ) : (
        <CheckOutUi handleCheckOut={handleCheckOut} />
      )}
    </div>
  );
};

export default ProfileCard;
