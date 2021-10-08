import { useSelector, shallowEqual } from 'react-redux';
import '../styles/Profile.css';

const Profile = () => {
  const { id, profile } = useSelector(
    state => ({
      id: state.user.id,
      profile: state.user.profile
    }),
    shallowEqual
  );

  return (
    <div id='profile-wrapper'>
      <img id='profile' src={profile} alt='profile' />
      <h2>{id}</h2>
    </div>
  );
};

export default Profile;
