import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../redux/configureStore";
import "../styles/Profile.css";

const Profile = () => {
  const { id, profile } = useSelector(
    (state: RootState) => ({
      id: state.userReducer.id,
      profile: state.userReducer.profile,
    }),
    shallowEqual,
  );

  return (
    <div id='profile-wrapper'>
      <img id='profile' src={profile} alt='profile' />
      <h2>{id}</h2>
    </div>
  );
};

export default Profile;
