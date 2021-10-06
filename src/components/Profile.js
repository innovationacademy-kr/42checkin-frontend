import { useSelector, shallowEqual } from 'react-redux';

const Profile = () => {
  const { id } = useSelector(
    state => ({
      id: state.user.id
    }),
    shallowEqual
  );

  return (
    <>
      <img
        src='https://sports-phinf.pstatic.net/team/kbo/default/LT.png?type=f108_108'
        alt='profile'
      />
      <h3>{id}</h3>
    </>
  );
};

export default Profile;
