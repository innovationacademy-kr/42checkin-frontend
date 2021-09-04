import StatusBoard from '../components/StatusBoard';
import '../styles/LandingPage.css';

function LandingPage() {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/user/login`;
  };

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
