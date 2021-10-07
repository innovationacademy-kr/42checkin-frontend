import { useEffect, useState } from 'react';
import moment from 'moment-timezone';

import { getDailyUsage } from '../api/api';
import { sec2hour } from '../utils/utils';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import '../styles/TimeLog.css';

const FOUR_HOURS = 14400;

const TimeLog = ({ handleFlip }) => {
  const [logs, setLogs] = useState([]);
  // const [logs, setLogs] = useState([
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-01',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-02',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-03',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-04',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-05',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-06',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-07',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-08',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-09',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-10',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-11',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-12',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-13',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-14',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-15',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-16',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-17',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-18',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-19',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-20',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-21',
  //     seconds: '300'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-22',
  //     seconds: '1125435'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-10-23',
  //     seconds: '176'
  //   },
  //   {
  //     login: 'ohjongin',
  //     date: '2021-11-24',
  //     seconds: '300'
  //   }
  // ]);
  const [count, setCount] = useState(0);

  const getLogs = async () => {
    try {
      const today = new Date();
      const from = moment(new Date(today.getFullYear(), today.getMonth(), 1))
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss');
      const to = moment(new Date(today.getFullYear(), today.getMonth() + 1, 0))
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD HH:mm:ss');
      const response = getDailyUsage(from, to);
      if (response.data) {
        const wallet = response.data.filter(({ seconds }) => +seconds > FOUR_HOURS).length;
        setCount(wallet);
        setLogs(response.data);
      }
      // const wallet = logs.filter(({ seconds }) => +seconds > FOUR_HOURS).length;
      // setCount(wallet);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div id='time-log-wrapper'>
      <div style={{ textAlign: 'right', width: '100%' }}>
        <AutorenewIcon onClick={handleFlip} />
      </div>
      <h4>CLUSTER LOG</h4>
      <div style={{ width: '100%', textAlign: 'right', marginBottom: '1rem' }}>ALL: {count}₳</div>
      <ul>
        <li>
          <div>DATE</div>
          <div>TIME</div>
          <div>WALLET</div>
        </li>
        {logs.reverse().map(({ date, seconds }, idx) => (
          <div key={idx}>
            <li>
              <time dateTime={date}>{date}</time>
              <div>{sec2hour(seconds)}</div>
              <div>{+seconds > FOUR_HOURS && '1₳'}</div>
            </li>
            <hr className='divider' />
          </div>
        ))}
      </ul>
    </div>
  );
};
export default TimeLog;
