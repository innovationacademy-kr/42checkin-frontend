import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '../components/Checkbox';
import TextField from '@material-ui/core/TextField';

import { checkLists } from '../utils/notice';

import { setCardNum } from '../redux/modules/user';
import '../styles/CheckInForm.css';

const CheckInForm = ({ checkAll, setCheckAll, checkStatus, setCheckStatus }) => {
  const dispatch = useDispatch();

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
      <TextField
        id='standard-basic'
        label='Card Number'
        onChange={e => {
          dispatch(setCardNum(e.target.value));
        }}
      />
    </>
  );
};
export default CheckInForm;
