import { useSelector, shallowEqual } from 'react-redux';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { sec2hour } from '../utils/utils';
import '../styles/TimeLog.css';

const FOUR_HOURS = 14400;

const mockData = [
  {
    login: 'ohjongin',
    date: '2021-10-05',
    seconds: '1125435'
  },
  {
    login: 'ohjongin',
    date: '2021-10-06',
    seconds: '176'
  },
  {
    login: 'ohjongin',
    date: '2021-11-05',
    seconds: '300'
  }
];

const TimeLog = ({ setIsFlip, handleFlip }) => {
  return (
    <div id='time-log-wrapper'>
      <AutorenewIcon onClick={handleFlip} />
      <ul>
        {mockData.reverse().map(({ login, date, seconds }) => (
          <li key={date}>
            {date} {sec2hour(seconds)} {+seconds > FOUR_HOURS && '1₳'}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TimeLog;
