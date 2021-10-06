import { useSelector, shallowEqual } from 'react-redux';

const CheckInInfo = () => {
  const { cardNum } = useSelector(
    state => ({
      cardNum: state.user.cardNum
    }),
    shallowEqual
  );

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20 }}>Card Number</div>
        <div style={{ fontSize: 70 }}>{cardNum}</div>
      </div>
    </div>
  );
};
export default CheckInInfo;
