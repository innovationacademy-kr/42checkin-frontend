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
import { DEFAULT_PROFILE } from '../utils/utils';

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
      const { user, cluster } = response.data;
      dispatch(
        setUser({
          id: user.login,
          cardNum: user.card !== null ? user.card : '',
          status: user.card !== null ? 'in' : 'out',
          profile: user.profile_image_url || DEFAULT_PROFILE
        })
      );
      dispatch(
        setHeadCount({
          gaepo: cluster.gaepo,
          seocho: cluster.seocho
        })
      );
    } catch (err) {
      console.log(err);
      document.cookie = `${process.env.REACT_APP_AUTH_KEY}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`;
      dispatch(logout());
    }
  }, [dispatch]);

  // const getHeadCount = useCallback(async () => {
  //   try {
  //     const response = await getUsingCard();
  //     dispatch(setHeadCount(response.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [dispatch]);

  const handleFlip = e => {
    setIsFlip(state => !state);
    const elem = document.getElementById('checkin-card-wrapper');
    if (elem.style.transform == 'rotateY(180deg)') {
      elem.style.transform = 'rotateY(0deg)';
    } else {
      elem.style.transform = 'rotateY(180deg)';
    }
  };

  useEffect(() => {
    if (!isLogin) history.push('/');
    getUserData();
    // getHeadCount();
  }, [isLogin, history, getUserData]);

  return (
    <div id='checkin-wrapper'>
      <h2>CHECK IN</h2>
      <StatusBoard />
      <div id='checkin-card-wrapper'>
        {!isFlip ? (
          <ProfileCard setIsFlip={setIsFlip} handleFlip={handleFlip} />
        ) : (
          <TimeLog setIsFlip={setIsFlip} handleFlip={handleFlip} />
        )}
      </div>
    </div>
  );
};
export default CheckInPage;
