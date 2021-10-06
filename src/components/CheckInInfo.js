import { useSelector, shallowEqual } from 'react-redux';

import '../styles/ProfileCard.css';

const CheckInInfo = () => {
  const { cardNum } = useSelector(
    state => ({
      cardNum: state.user.cardNum
    }),
    shallowEqual
  );

  return (
    <>
      <h3>Card Number : {cardNum}</h3>
    </>
  );
};
export default CheckInInfo;
