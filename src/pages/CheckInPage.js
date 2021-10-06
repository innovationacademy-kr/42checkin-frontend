import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkAdmin, getUsingCard } from '../api/api';
import { setHeadCount } from '../redux/modules/status';
import { logout } from '../redux/modules/user';

import StatusBoard from '../components/StatusBoard';
import ProfileCard from '../components/ProfileCard';
import TimeLog from '../components/TimeLog';

import { setUser } from '../redux/modules/user';
import '../styles/CheckInPage.css';

const CheckInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = useSelector(
    state => ({
      isLogin: state.user.isLogin
    }),
    shallowEqual
  );

  const [isFlip, setIsFlip] = useState(false);

  const getUserData = useCallback(async () => {
    try {
      const response = await checkAdmin();
      const { user } = response.data;
      dispatch(
        setUser({
          id: user.login,
          cardNum: user.card !== null ? user.card : '',
          status: user.card !== null ? 'in' : 'out'
        })
      );
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      dispatch(logout());
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
    if (!isLogin) history.push('/');
    getUserData();
    getHeadCount();
  }, [isLogin, history, getUserData, getHeadCount]);

  return (
    <div id='checkin-wrapper'>
      <h2>CHECK IN</h2>
      <StatusBoard />
      {!isFlip ? <ProfileCard setIsFlip={setIsFlip} /> : <TimeLog setIsFlip={setIsFlip} />}
    </div>
  );
};
export default CheckInPage;
