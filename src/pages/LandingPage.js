import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import StatusBoard from '../components/StatusBoard';
import { LoginContext } from '../contexts/LoginContext';
import '../styles/LandingPage.css';

function LandingPage() {
  const { isLogin } = useContext(LoginContext);
  const history = useHistory();

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/user/login`;
  };

  useEffect(() => {
    if (isLogin) history.push('/checkin');
  });

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
