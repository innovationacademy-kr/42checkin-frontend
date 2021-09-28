import { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StatusBoard from '../components/StatusBoard';
import '../styles/LandingPage.css';

function LandingPage() {
  const history = useHistory();
  const { isLogin } = useSelector(
    state => ({
      isLogin: state.user.isLogin
    }),
    shallowEqual
  );
  const handleLogin = () => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/user/login?redirect=${encodeURIComponent(window.location.href)}`;
  };

  useEffect(() => {
    if (isLogin) history.push('/checkin');
  }, [history, isLogin]);

  return (
    <div id='landing-wrapper'>
      <h1>42 Check In</h1>
      <StatusBoard />
      <button id='login-btn' onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}

export default LandingPage;
