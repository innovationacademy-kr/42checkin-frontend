import { useSelector, shallowEqual } from 'react-redux';
import '../styles/Profile.css';

const Profile = () => {
  const { id } = useSelector(
    state => ({
      id: state.user.id
    }),
    shallowEqual
  );

  return (
    <div id='profile-wrapper'>
      <img
        src='https://sports-phinf.pstatic.net/team/kbo/default/LT.png?type=f108_108'
        alt='profile'
      />
      <h2>{id}</h2>
    </div>
  );
};

export default Profile;
