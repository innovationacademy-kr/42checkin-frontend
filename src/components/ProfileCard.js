import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Profile from '../components/Profile';
import CheckInForm from '../components/CheckInForm';
import CheckInInfo from '../components/CheckInInfo';
import { checkOut, checkIn } from '../api/api';

import { setCardNum } from '../redux/modules/user';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import '../styles/ProfileCard.css';

const ProfileCard = ({ handleFlip }) => {
  const history = useHistory();
  const { cardNum, status } = useSelector(
    state => ({
      cardNum: state.user.cardNum,
      status: state.user.status
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);
  const [checkStatus, setCheckStatus] = useState([false, false, false]);
  const [readySubmit, setReadySubmit] = useState(false);

  const btnText = status === 'out' ? 'CHECK IN' : 'CHECK OUT';

  const handleCheckIn = useCallback(async () => {
    if (readySubmit) {
      try {
        console.log('cardNum', cardNum);
        await checkIn(cardNum);
        history.push('/end');
      } catch (err) {
        if (err.response.data.code === 404) {
          alert(err.response.data.message);
        } else {
          alert('체크인을 처리할 수 없습니다. 제한 인원 초과가 아닌 경우 관리자에게 문의해주세요.');
        }
        dispatch(
          setCardNum({
            cardNum: ''
          })
        );
      }
    }
  }, [cardNum, readySubmit, history, dispatch]);

  const handleCheckOut = useCallback(async () => {
    if (window.confirm('퇴실 하시겠습니까?')) {
      try {
        await checkOut();
        history.push('/end');
      } catch (err) {
        if (!err.response) {
          alert('정상적으로 처리되지 않았습니다.\n네트워크 연결 상태를 확인해주세요.');
        } else if (err.response.data.code === 404) {
          alert('이미 체크아웃 되었습니다.');
          history.push('/');
        } else {
          alert(err.response.data.message);
        }
      }
    }
  }, [history]);

  const checkSubmitCondition = useCallback(() => {
    if (cardNum && checkAll) {
      setReadySubmit(true);
    } else {
      setReadySubmit(false);
    }
  }, [cardNum, checkAll]);

  useEffect(() => {
    if (status === 'out') {
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

  return (
    <div id='profile-card-wrapper'>
      {status === 'in' && (
        <div
          style={{
            textAlign: 'right',
            width: '100%'
            // position: 'fixed',
            // top: '30px',
            // right: '30px'
          }}
        >
          <AutorenewIcon onClick={handleFlip} />
        </div>
      )}
      <Profile />
      {status === 'out' ? (
        <CheckInForm
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          checkStatus={checkStatus}
          setCheckStatus={setCheckStatus}
        />
      ) : (
        <>
          <hr className='divider' />
          <CheckInInfo />
        </>
      )}
      <Button
        className={
          status === 'out' ? `submitBtn out ${readySubmit ? 'ready' : ''}` : 'submitBtn in'
        }
        handleClick={status === 'out' ? handleCheckIn : handleCheckOut}
        text={btnText}
      />
    </div>
  );
};

export default ProfileCard;
