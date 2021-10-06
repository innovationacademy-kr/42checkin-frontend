import { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Checkbox from '../components/Checkbox';
import UserInput from '../components/UserInput';

import { checkLists } from '../utils/notice';

import { setCardNum } from '../redux/modules/user';
import '../styles/CheckInForm.css';

const CheckInForm = ({ checkAll, setCheckAll, checkStatus, setCheckStatus }) => {
  const dispatch = useDispatch();
  const { cardNum } = useSelector(
    state => ({
      cardNum: state.user.cardNum
    }),
    shallowEqual
  );

  const handleCheckAll = useCallback(
    e => {
      const isChecked = e.target.checked;
      setCheckAll(isChecked);
      setCheckStatus([isChecked, isChecked, isChecked]);
    },
    [setCheckAll, setCheckStatus]
  );

  return (
    <>
      <div id='check-in-form-wrapper'>
        <label htmlFor='allCheck' style={{ fontSize: '1em' }}>
          <input id='allCheck' type='checkbox' checked={checkAll} onChange={handleCheckAll} />
          모두 동의
        </label>
        <div>
          {checkLists.map((checkList, idx) => (
            <Checkbox
              key={idx}
              idx={idx}
              text={checkList}
              checkStatus={checkStatus}
              setCheckStatus={setCheckStatus}
            />
          ))}
        </div>
      </div>
      <UserInput
        label='Card Number'
        type='number'
        placeholder='카드 번호를 입력해주세요'
        value={cardNum}
        handleChange={e => {
          dispatch(setCardNum(e.target.value));
        }}
      />
    </>
  );
};
export default CheckInForm;
